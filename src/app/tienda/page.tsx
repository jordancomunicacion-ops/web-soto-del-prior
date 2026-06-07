import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { syncCatalogToCache } from '@/lib/obrador';
import BuyButton from '../BuyButton';
import StoreHeader from '../StoreHeader';
import CartSidebar from '../CartSidebar';

export const metadata: Metadata = {
  title: 'Tienda',
  description: 'Compra online la selección de SOTO del PRIOR: packs de carne, embutidos artesanos, licores y experiencias.',
  alternates: { canonical: '/tienda' },
};

// El catálogo cambia poco; revalidamos en segundo plano.
export const revalidate = 120;

// Etiquetas y orden de las categorías en la tienda.
const CATEGORY_LABELS: Record<string, string> = {
  PACK_CARNE: 'Packs de carne',
  EMBUTIDO: 'Embutidos artesanos',
  LICOR: 'Licores',
  EXPERIENCIA: 'Experiencias',
  OTROS: 'Otros',
};
const CATEGORY_ORDER = ['PACK_CARNE', 'EMBUTIDO', 'LICOR', 'EXPERIENCIA', 'OTROS'];

async function getProducts() {
  try {
    await syncCatalogToCache();
    const products = await prisma.shopProduct.findMany({ orderBy: { name: 'asc' } });
    return products.map((p) => ({ ...p, price: parseFloat(p.price.toString()) }));
  } catch (error) {
    console.error('DB Error:', error);
    return [];
  }
}

export default async function TiendaPage() {
  const products = await getProducts();

  // Agrupar por categoría respetando el orden definido.
  const byCategory = new Map<string, typeof products>();
  for (const p of products) {
    const key = CATEGORY_ORDER.includes(p.category) ? p.category : 'OTROS';
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key)!.push(p);
  }
  const sortedCategories = CATEGORY_ORDER.filter((c) => byCategory.has(c));

  return (
    <main className="tienda-root">
      <StoreHeader />
      <CartSidebar />

      <div className="tienda-container">
        <header className="tienda-header">
          <Link href="/" className="tienda-back">← Volver</Link>
          <h1 className="tienda-title">TIENDA</h1>
          <p className="tienda-subtitle">
            Lo auténtico, a tu casa. Selección de nuestra tierra y experiencias para regalar.
          </p>
        </header>

        {products.length === 0 ? (
          <p className="tienda-empty">Estamos preparando la tienda. Vuelve pronto.</p>
        ) : (
          sortedCategories.map((cat) => (
            <section key={cat} className="tienda-section">
              <h2 className="tienda-cat-title">{CATEGORY_LABELS[cat] ?? cat}</h2>
              <div className="tienda-grid">
                {byCategory.get(cat)!.map((p) => (
                  <div key={p.id} className="product-card">
                    {p.image && <img src={p.image} alt={p.name} />}
                    <h3>{p.name}</h3>
                    {p.description && <p className="product-detail">{p.description}</p>}
                    <p className="product-price">{p.price.toFixed(2)}€</p>
                    <BuyButton product={{ id: p.id, name: p.name, price: p.price, image: p.image }} />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
