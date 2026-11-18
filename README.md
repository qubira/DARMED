# Grupo DARMED · Maqueta web

Maqueta interactiva (HTML/CSS/JS estático) del ecosistema Grupo DARMED.

## Páginas
| Ruta | Descripción |
|---|---|
| `/` → `darmed.html` | DARMED · clínica de estética y bienestar |
| `renace.html` | RENACE · tienda de belleza coreana |
| `depizone.html` | DEPIZONE · depilación láser con cotizador por zonas |
| `integrativa.html` | INTEGRATIVA · pre-lanzamiento de medicina integrativa |
| `loger.html` | Intranet · acceso por roles (Master, Agendador, Doctor) |
| `master.html` | Suite administrativa: dashboard, reportes, caja, clientes, inventario, usuarios, roles, sedes, historial y configuración |
| `agendamiento.html` | Agenda clínica semanal y panel del doctor |

Las páginas comparten estado en el navegador (`localStorage`): las compras, reservas y registros hechos en las webs aparecen en el Master y en la Agenda. Los datos son de ejemplo.

## Despliegue en Vercel
Importa el repositorio en Vercel sin configurar nada: `vercel.json` sirve la carpeta `public/` como sitio estático (no hay build).

Local: abre `public/darmed.html` en el navegador o ejecuta `npx serve public`.
