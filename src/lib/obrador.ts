import { prisma } from '@/lib/prisma';

/**
 * Puente con el obrador (App cocina SOTOdelPRIOR), que es la FUENTE DE VERDAD
 * del catálogo y los pedidos. La web es escaparate + cobro (Stripe).
 *
 * Config (.env):
 *   OBRADOR_API_URL  -> base del obrador, p.ej. https://obrador.sotodelprior.com
 *   OBRADOR_API_KEY  -> clave de integración del LOCAL (Obrador → Ajustes → Integración)
 *
 * El catálogo del obrador se cachea en la tabla local `ShopProduct` usando el
 * `id` del MasterProduct como id, de modo que el resto del flujo de la web
 * (carrito, checkout con validación de precio, pedido) sigue funcionando igual.
 */

const OBRADOR_URL = process.env.OBRADOR_API_URL?.replace(/\/$/, '') ?? '';
const OBRADOR_KEY = process.env.OBRADOR_API_KEY ?? '';

export type ObradorProduct = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  legalDenomination: string | null;
  allergens: string | null;
};

export function isObradorConfigured(): boolean {
  return Boolean(OBRADOR_URL && OBRADOR_KEY);
}

/** Lee el catálogo vendible del obrador. Lanza si falla la red o la respuesta. */
export async function fetchObradorCatalog(): Promise<ObradorProduct[]> {
  if (!isObradorConfigured()) {
    throw new Error('OBRADOR_API_URL / OBRADOR_API_KEY no configurados');
  }
  const res = await fetch(`${OBRADOR_URL}/api/integrations/catalog`, {
    headers: { 'x-api-key': OBRADOR_KEY },
    // El catálogo cambia poco: cache corta para no martillear el obrador.
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    throw new Error(`Obrador catalog ${res.status}`);
  }
  const data = (await res.json()) as { products?: ObradorProduct[] };
  return data.products ?? [];
}

/**
 * Sincroniza el catálogo del obrador hacia la caché local `ShopProduct`.
 * - Upsert por id (= MasterProduct id).
 * - Elimina de la caché los que ya no se venden, salvo que tengan pedidos
 *   asociados (no se puede borrar por la FK; se conservan para histórico).
 *
 * Devuelve los productos sincronizados, o `null` si el obrador no respondió
 * (el llamador debe usar entonces lo que ya haya en la caché).
 */
export async function syncCatalogToCache(): Promise<ObradorProduct[] | null> {
  let products: ObradorProduct[];
  try {
    products = await fetchObradorCatalog();
  } catch (err) {
    console.error('[obrador] catálogo no disponible, usando caché local:', err);
    return null;
  }

  for (const p of products) {
    if (p.price == null) continue; // sin precio no es vendible
    await prisma.shopProduct.upsert({
      where: { id: p.id },
      update: {
        name: p.name,
        description: p.description ?? null,
        price: p.price,
        image: p.imageUrl ?? null,
        category: p.category ?? 'OTROS',
      },
      create: {
        id: p.id,
        name: p.name,
        description: p.description ?? null,
        price: p.price,
        image: p.imageUrl ?? null,
        category: p.category ?? 'OTROS',
      },
    });
  }

  // Podar de la caché los productos que ya no llegan del obrador y no tienen
  // pedidos (los que tienen pedidos se quedan por la FK / histórico).
  const liveIds = products.map((p) => p.id);
  const stale = await prisma.shopProduct.findMany({
    where: { id: { notIn: liveIds.length ? liveIds : ['__none__'] } },
    select: { id: true, _count: { select: { orderItems: true } } },
  });
  const deletable = stale.filter((s) => s._count.orderItems === 0).map((s) => s.id);
  if (deletable.length) {
    await prisma.shopProduct.deleteMany({ where: { id: { in: deletable } } });
  }

  return products;
}

/**
 * Reenvía un pedido YA PAGADO al obrador. Idempotente en el obrador por
 * `paymentRef`. No lanza: registra el error y devuelve false (el pago ya se
 * cobró; un fallo aquí no debe romper el webhook, se puede reintentar).
 */
export async function forwardOrderToObrador(payload: {
  paymentRef: string;
  total: number;
  customerName: string;
  customerEmail: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  zipCode?: string | null;
  notes?: string | null;
  items: Array<{
    masterProductId?: string;
    productName: string;
    quantity: number;
    priceAtPurchase: number;
  }>;
}): Promise<boolean> {
  if (!isObradorConfigured()) {
    console.warn('[obrador] no configurado: no se reenvía el pedido');
    return false;
  }
  try {
    const res = await fetch(`${OBRADOR_URL}/api/integrations/orders`, {
      method: 'POST',
      headers: { 'x-api-key': OBRADOR_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      console.error(`[obrador] reenvío de pedido falló ${res.status}: ${txt}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[obrador] error reenviando pedido:', err);
    return false;
  }
}
