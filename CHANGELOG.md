---

### 2. Archivo `CHANGELOG.md`
Este archivo registra la evolución del sistema de tiempo para llevar un control de versiones limpio.

```markdown
# Changelog - SISOV PRO Time API

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2026-02-11
### ✅ Añadido
- **Versión Inicial:** Creación del servidor Express base.
- **Motor de Scraping:** Implementación de `cheerio` para extraer datos del DOM de 24timezones.
- **Modo Ninja:** Integración de headers personalizados (`User-Agent`, `Accept-Language`) para evadir bloqueos de bots.
- **Normalización de Fecha:** Función para convertir el texto extraído del scraping en un objeto Date válido para el sistema SISOV PRO.
- **Soporte CORS:** Configuración para permitir peticiones desde orígenes externos.

### ⚙️ Optimización
- Configuración de `requestKey: null` en las consultas de PocketBase (del lado del cliente) para evitar cancelaciones automáticas.
- Implementación de la variable `id_fecha` para garantizar reportes diarios inmutables.

### 🚀 Despliegue
- Preparación de archivos para despliegue continuo en **Railway.app**.