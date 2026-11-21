# iiradia · Maqueta web

Maqueta interactiva en HTML, CSS y JavaScript para las cuatro líneas de iiradia. La portada reúne las marcas y enlaza directamente a sus herramientas.

## Páginas
| Ruta | Descripción |
|---|---|
| `/` | Portal iiradia y guía de cuidado |
| `darmed.html` | IRRADIA · clínica de estética y bienestar |
| `renace.html` | NUTRI · tienda de belleza coreana |
| `integrativa.html` | SMALL · prelanzamiento de medicina integrativa |
| `depizone.html` | STHETIC · depilación láser con cotizador por zonas |
| `loger.html` | Intranet · acceso por roles (Master, Agendador, Doctor) |
| `master.html` | Suite administrativa: dashboard, reportes, caja, clientes, inventario, usuarios, roles, sedes, historial y configuración |
| `agendamiento.html` | Agenda clínica semanal y panel del doctor |

Las páginas comparten estado en el navegador (`localStorage`): las compras, reservas y registros hechos en las webs aparecen en el Master y en la Agenda. Los datos son de ejemplo.

## Despliegue en Vercel
Importa el repositorio en Vercel sin configurar nada: `vercel.json` sirve la carpeta `public/` como sitio estático (no hay build).

Para probar el sitio localmente, ejecuta `python -m http.server --directory public` y abre `http://localhost:8000`.
