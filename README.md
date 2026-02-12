# SISOV PRO - Time Sync API (Ninja Edition) 🥷

Esta es una micro-servicio API diseñada para el ecosistema **SISOV PRO**. Su función principal es proporcionar la hora exacta de Venezuela (Caracas), evitando la dependencia de relojes locales de clientes o APIs públicas inestables.

## 🛠 Características
- **Sincronización ISO:** Devuelve la fecha en formato ISO 8601 para una integración directa con objetos `new Date()` en JavaScript.
- **Ligera:** Construida con Node.js, Express y Axios para un consumo mínimo de recursos en Railway.
- **CORS Habilitado:** Configurada para aceptar peticiones desde el dominio de tu aplicación SISOV PRO.

## 🚀 Instalación y Despliegue

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
