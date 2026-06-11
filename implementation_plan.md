# Auditoria Visual, Sistema Tipografico y Publicacion en Vercel

## Resumen

Realizar una pasada visual completa del sitio bilingue para mejorar coherencia de fondos y legibilidad tipografica, sin modificar contenido, arquitectura, navegacion ni funcionalidad.

La nueva identidad tipografica utilizara Manrope para titulos e Inter para cuerpo e interfaz. Los resaltes combinaran peso, tamano y uso puntual del color ambar.

## Implementacion

- Sustituir Clash Display por Manrope mediante `next/font`.
- Mantener Inter para parrafos, formularios, navegacion y elementos funcionales.
- Crear roles tipograficos reutilizables para heroes, encabezados, tarjetas, introducciones, cuerpo, etiquetas y acciones.
- Reequilibrar pesos, tamanos, tracking y line-height, especialmente en movil y espanol.
- Crear tokens y un componente compartido de fondos con variantes cinematograficas, contextuales y funcionales.
- Extender `InteriorHero` para controlar imagen, posicion, contraste e intensidad del overlay.
- Corregir areas planas mediante gradientes, grillas, luces, bordes y transiciones reutilizables.
- Crear fondos propios optimizados solo para Ubicaciones, Recursos y bandas de red operativa donde aporten contexto real.
- Mantener intactos textos, claims, estructura, navegacion, formularios, metadata y Schema.org.
- Integrar los cambios, validar el sitio completo y desplegar al proyecto existente de Vercel.

## Validacion

- Revisar desktop y movil en ingles y espanol.
- Auditar home, Servicios, Paquetes, Ubicaciones, About, Recursos, Contacto y paginas detalle representativas.
- Confirmar legibilidad, contraste, continuidad entre secciones, saltos naturales en titulos largos y ausencia de fondos planos accidentales.
- Validar navegacion por teclado, movimiento reducido y ausencia de saltos de layout.
- Ejecutar TypeScript, lint, validacion del catalogo, build y crawl bilingue.
- Realizar una revision visual final sobre el despliegue de Vercel.

## Supuestos

- No se cambiara el contenido ni el orden de las paginas.
- Manrope sera la tipografia de display e Inter la tipografia funcional.
- El ambar se usara de forma puntual, nunca en titulos completos.
- La fase es exclusivamente de pulido visual.
- No se escribiran secretos ni credenciales en archivos versionados.
