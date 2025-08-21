# CHANGELOG

## 0.2.1 - 2025-08-21
- Pulso visual al alcanzar potencia máxima (anillo late + halo).
- Doble destello (segundo flame burst) al soltar con potencia completa.
- Vibración distintiva al llegar al 100% de carga.

## 0.2.2 - 2025-08-21
- Press & hold habilitado también en el botón "Girar ruleta" (misma lógica de carga que sobre la rueda).
- Prevención de doble disparo (click tras pointerup).
- Limpieza menor (parámetro no usado, consistencia estados de power).

## 0.2.0 - 2025-08-21
- Barra de fuerza radial alrededor de la ruleta (press & hold) con relleno progresivo.
- Gradiente dinámico verde→amarillo→naranja→rojo con brillo tipo candela.
- Más vueltas máximas (hasta +6 extra) visualmente representadas por la barra.
- Limpieza menor y pequeños ajustes de estilos.

## 0.1.0 - 2025-08-21
- Ruleta: giro alineado al centro de cada segmento (evita caer en la línea).
- Press & hold: potencia con límite 3.5s, vibración periódica, sonido tipo motor.
- Efectos visuales: anillo de carga y anillo de fuego al soltar.
- Anti copia móvil: deshabilitada selección y menú contextual en ruleta y botón.
- Persistencia de preferencia de sonido en localStorage.
- Limpieza y refactors menores (logo, cabecera, estilos responsive).
