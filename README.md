# Servidor SOTOdelPRIOR (Central Hub)

El punto de entrada principal para el ecosistema digital de Soto del Prior. Este proyecto actúa como Dashboard unificado para acceder a todos los subsistemas.

## 🏗️ Arquitectura del Sistema

El sistema está organizado en micro-servicios y aplicaciones modulares corriendo en el mismo servidor.

### 🔌 Mapa de Puertos Asignados

| Aplicación | Puerto | Tecnología | Estado |
| :--- | :--- | :--- | :--- |
| **Servidor Central (Hub)** | `3000` | Next.js 16 | ✅ Producción |
| **Motor Reservas (Web)** | `3001` | Next.js 16 | ✅ Producción |
| **App Cocina** | `3002` | Next.js (TBD) | 🚧 Reservado |
| **App Ganadera** | `3003` | Next.js (TBD) | ⏳ Pendiente |
| **Motor Reservas (API)** | `4000` | NestJS | ✅ Producción |

### 🔗 Servicios Externos
Estos servicios funcionan con software independiente y no consumen puertos de Node.js gestionados por este repo.
- **TPV (Agora)**: Software externo.
- **Videovigilancia**: Software externo / DVR.

## 🚀 Despliegue

### Requisitos
- Node.js 20+
- Git

### Iniciar Hub Central
```bash
npm install
npm run dev
# Acceso en http://localhost:3000
```
