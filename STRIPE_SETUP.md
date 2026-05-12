# Configuración de Stripe — SOTO del PRIOR

Esta guía explica cómo terminar de poner en marcha la pasarela de pago.

## 1. Crear cuenta y obtener claves

1. Entra en https://dashboard.stripe.com/register y crea una cuenta.
2. Activa el **modo Test** (toggle arriba a la izquierda).
3. Ve a **Developers → API keys** (https://dashboard.stripe.com/test/apikeys).
4. Copia las dos claves:
   - **Publishable key** → `pk_test_...`
   - **Secret key** → `sk_test_...` (revélala con "Reveal test key")

## 2. Pegar las claves en `.env`

Edita el archivo `.env` en la raíz del proyecto y reemplaza los placeholders:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_AQUI
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
STRIPE_WEBHOOK_SECRET=whsec_LO_VEMOS_EN_EL_PASO_3
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ Nunca subas `.env` a git. Está en `.gitignore`.

## 3. Configurar el webhook

El webhook es lo que confirma el pago **en servidor** (más fiable que confiar en
la redirección del navegador).

### Para desarrollo local

Instala el CLI de Stripe (https://docs.stripe.com/stripe-cli) y ejecuta:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

El comando imprime el `whsec_...` que debes pegar en `STRIPE_WEBHOOK_SECRET`.

### Para producción

1. Despliega la app y obtén su URL pública (ej. `https://www.sotodelprior.com`).
2. Ve a https://dashboard.stripe.com/test/webhooks → **Add endpoint**.
3. URL del endpoint: `https://TU_DOMINIO/api/webhooks/stripe`
4. Eventos a escuchar:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el "Signing secret" del endpoint y ponlo en `STRIPE_WEBHOOK_SECRET` del
   entorno de producción.

## 4. Probar el flujo

1. Arranca la app: `npm run dev`
2. Añade productos al carrito y ve a `/checkout`.
3. Completa los datos. Para pagar usa una **tarjeta de prueba** de Stripe:
   - **Visa OK**: `4242 4242 4242 4242` · cualquier fecha futura · cualquier CVC
   - **Requiere 3DS**: `4000 0027 6000 3184`
   - **Rechazada**: `4000 0000 0000 9995`
   - Más tarjetas: https://docs.stripe.com/testing
4. Tras el pago serás redirigido a `/checkout/success?order_id=...`.
5. En la consola del CLI de Stripe deberías ver el evento
   `payment_intent.succeeded` reenviado a tu webhook.
6. En la base de datos (`prisma studio`) el pedido pasa de `PENDING` a `PAID`.
7. Si tienes SMTP configurado (`SMTP_USER`, `SMTP_PASS`), el cliente recibe el
   email de confirmación.

## 5. Pasar a producción

1. Activa el modo **Live** en el dashboard de Stripe.
2. Sustituye las claves `pk_test_` / `sk_test_` por `pk_live_` / `sk_live_`.
3. Crea un nuevo webhook endpoint (Live) y copia su `whsec_`.
4. Pon `NEXT_PUBLIC_BASE_URL=https://www.sotodelprior.com` en producción.
5. Ten en cuenta que en Live la cuenta tiene que estar verificada para poder
   recibir cobros reales.

## Archivos clave

- `src/lib/stripe.ts` — singleton del SDK de servidor
- `src/app/api/checkout/route.ts` — crea pedido + PaymentIntent (precio validado en BD)
- `src/app/api/webhooks/stripe/route.ts` — confirma el pago y manda email
- `src/app/api/orders/[id]/route.ts` — lee el pedido para la página de éxito
- `src/app/checkout/StripeWrapper.tsx` — Elements provider (modo deferred)
- `src/app/checkout/CheckoutForm.tsx` — formulario + confirmación con Stripe.js
- `src/app/checkout/success/page.tsx` — confirmación visual + reset del carrito
- `src/app/api/orders/create/route.ts` — **deprecated** (devuelve 410)

## Decisiones de diseño

- **Precio validado en servidor**: el cliente solo manda `id` + `quantity`.
  El total se recalcula a partir de `ShopProduct.price` en BD, evitando que se
  manipule desde devtools.
- **Pedido creado antes del pago**: se guarda como `PENDING` antes de confirmar
  el PaymentIntent. El webhook lo pasa a `PAID` cuando Stripe avisa.
- **Modo deferred Elements**: usamos `mode: 'payment'` con `amount` aproximado
  en el cliente; el `clientSecret` real se obtiene en el submit, así podemos
  recoger primero los datos de envío y crear el `ShopOrder` con todos los datos.
- **Idempotencia del webhook**: el handler comprueba si la orden ya está
  `PAID` antes de actualizarla, así reintentos de Stripe no duplican emails.
