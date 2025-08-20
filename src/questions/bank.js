// Banco de preguntas por categoría de la ruleta
// Tipos soportados: 'tf' (Verdadero/Falso), 'short' (respuesta corta exacta)

export const baseByCat = {
  Calidad: [
  { id: 'cal1', type: 'tf', text: 'La calidad de datos incluye precisión, integridad y consistencia.', answer: true, explain: 'Son cualidades básicas de un buen dato: correcto, completo y coherente.' },
  { id: 'cal2', type: 'tf', text: 'Un dato inexacto, aun útil, sigue considerándose de alta calidad.', answer: false, explain: 'La utilidad no sustituye la precisión. Un dato inexacto no puede considerarse de alta calidad.' },
  { id: 'cal3', type: 'tf', text: 'La integridad es una dimensión de calidad que mide completitud.', answer: true, explain: 'Integridad se refiere a que no falten campos clave. Otras dimensiones: precisión, consistencia, oportunidad.' },
  { id: 'cal4', type: 'tf', text: 'La calidad de datos afecta directamente la toma de decisiones.', answer: true, explain: 'Decisiones basadas en datos de baja calidad llevan a errores y riesgos operativos.' },
  { id: 'cal5', type: 'tf', text: 'La oportunidad/puntualidad es una dimensión de calidad.', answer: true, explain: 'Se refiere a la disponibilidad del dato a tiempo para su uso.' },
  { id: 'cal6', type: 'tf', text: 'La consistencia implica que el mismo dato tenga el mismo valor en todos los sistemas.', answer: true, explain: 'Si un campo difiere entre fuentes, hay inconsistencia; esto deteriora la confianza y los análisis.' },
  { id: 'cal7', type: 'tf', text: 'Un dato oportuno puede ser de baja calidad si es incorrecto.', answer: true, explain: 'La puntualidad no compensa la falta de precisión.' },
  { id: 'cal8', type: 'tf', text: 'Validaciones automáticas antes de guardar mejoran la calidad.', answer: true, explain: 'Detectan errores temprano y reducen retrabajo.' },
  { id: 'cal9', type: 'tf', text: 'Los duplicados nunca afectan la calidad.', answer: false, explain: 'Los duplicados distorsionan conteos y análisis.' },
  { id: 'cal10', type: 'tf', text: 'Usar estándares de formato (fechas, unidades) evita errores de interpretación.', answer: true, explain: 'Estandarizar asegura que todos lean el dato igual.' },
  // Reserva off-topic por si se agotan las preguntas
  { id: 'calx11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Hacer pausas al estudiar ayuda a retener mejor.', answer: true, explain: 'Las pausas mejoran la atención y la memoria.' },
  { id: 'calx12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Es recomendable desactivar todas las validaciones para ir más rápido.', answer: false, explain: 'Quitar validaciones aumenta errores y baja la calidad.' },
  ],
  Seguridad: [
  { id: 'seg1', type: 'tf', text: 'El control de acceso limita quién puede ver o modificar datos.', answer: true, explain: 'Sirve para que solo personas autorizadas entren o cambien la información.' },
  { id: 'seg2', type: 'tf', text: 'El cifrado sirve solo para datos en reposo.', answer: false, explain: 'El cifrado aplica en reposo y en tránsito; ambos son necesarios para proteger la confidencialidad.' },
  { id: 'seg3', type: 'tf', text: 'La autenticación multifactor reduce el riesgo de acceso no autorizado.', answer: true, explain: 'Agregar un segundo factor (algo que tienes) mitiga robo de contraseñas.' },
  { id: 'seg4', type: 'tf', text: 'ISO/IEC 27001 es un estándar de gestión de seguridad de la información.', answer: true, explain: 'Define requisitos de un SGSI (sistema de gestión de seguridad de la información).' },
  { id: 'seg5', type: 'tf', text: 'Los respaldos forman parte de los controles de seguridad.', answer: true, explain: 'Las copias de seguridad permiten recuperar datos ante incidentes y mejoran la resiliencia.' },
  { id: 'seg6', type: 'tf', text: 'El principio de mínimo privilegio sugiere otorgar solo el acceso estrictamente necesario.', answer: true, explain: 'Reduce la superficie de ataque y el impacto de cuentas comprometidas.' },
  { id: 'seg7', type: 'tf', text: 'Actualizar sistemas y parches reduce riesgos por vulnerabilidades.', answer: true, explain: 'Cierra fallas conocidas aprovechadas por atacantes.' },
  { id: 'seg8', type: 'tf', text: 'Compartir contraseñas por correo es seguro si es con un compañero.', answer: false, explain: 'Nunca compartas contraseñas; usa gestores y 2 factores.' },
  { id: 'seg9', type: 'tf', text: 'Cerrar sesión en equipos compartidos reduce el riesgo.', answer: true, explain: 'Evita accesos no autorizados posteriores.' },
  { id: 'seg10', type: 'tf', text: 'La ingeniería social busca engañar para obtener acceso.', answer: true, explain: 'Desconfía de solicitudes urgentes e inesperadas.' },
  // Reserva off-topic
  { id: 'segx11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Usar Wi‑Fi público sin protección es seguro para datos sensibles.', answer: false, explain: 'Las redes públicas pueden ser interceptadas; evita enviar información sensible.' },
  { id: 'segx12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Mantener el sistema operativo actualizado mejora la seguridad.', answer: true, explain: 'Las actualizaciones corrigen vulnerabilidades.' },
  ],
  Privacidad: [
  { id: 'pri1', type: 'tf', text: 'La minimización de datos busca recolectar solo lo necesario.', answer: true, explain: 'Recolectar y procesar lo mínimo reduce riesgo y cumple principios de privacidad.' },
  { id: 'pri2', type: 'tf', text: 'Los datos personales siempre pueden hacerse públicos si están en internet.', answer: false, explain: 'Que algo esté en internet no significa que puedas usarlo libremente.' },
  { id: 'pri3', type: 'tf', text: 'El consentimiento es un fundamento común para tratar datos personales.', answer: true, explain: 'Además del consentimiento, existen otros fundamentos como obligación legal o interés legítimo.' },
  { id: 'pri4', type: 'tf', text: 'Privacidad por diseño integra privacidad desde el diseño y por defecto.', answer: true, explain: 'Es un enfoque proactivo que previene en lugar de corregir.' },
  { id: 'pri5', type: 'tf', text: 'Anonimizar y seudonimizar son exactamente lo mismo.', answer: false, explain: 'Anonimizar elimina el vínculo con el individuo; seudonimizar lo oculta, pero puede reidentificarse.' },
  { id: 'pri6', type: 'tf', text: 'La portabilidad de datos permite al titular obtener y reutilizar sus datos.', answer: true, explain: 'Es un derecho en varias normativas; fomenta competencia y control del usuario.' },
  { id: 'pri7', type: 'tf', text: 'El derecho de acceso permite saber qué datos se tratan sobre ti.', answer: true, explain: 'Puedes solicitar una copia y conocer fines y fuentes.' },
  { id: 'pri8', type: 'tf', text: 'Publicar fotos de otras personas siempre es legal si son en lugares públicos.', answer: false, explain: 'Pueden requerir consentimiento y respetar derechos de imagen.' },
  { id: 'pri9', type: 'tf', text: 'Se debe informar la finalidad al recolectar datos personales.', answer: true, explain: 'La transparencia es un principio clave de privacidad.' },
  { id: 'pri10', type: 'tf', text: 'Eliminar datos cuando ya no se necesitan reduce riesgos.', answer: true, explain: 'Minimiza exposición y cumplimiento de retención.' },
  // Reserva off-topic
  { id: 'prix11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Configurar privacidad en redes sociales limita quién ve tu información.', answer: true, explain: 'Ajustar visibilidad protege tus datos personales.' },
  { id: 'prix12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Compartir tu ubicación en tiempo real siempre es seguro.', answer: false, explain: 'Compartir ubicación aumenta riesgos si no se controla.' },
  ],
  Catálogo: [
  { id: 'cat1', type: 'tf', text: 'Un catálogo de datos facilita descubrir y entender conjuntos de datos.', answer: true, explain: 'Centraliza metadatos, descripciones y responsables para acelerar el hallazgo.' },
  { id: 'cat2', type: 'tf', text: 'Un diccionario de datos describe campos y su significado.', answer: true, explain: 'Explica qué es cada campo y cómo se usa.' },
  { id: 'cat3', type: 'tf', text: 'Los metadatos ayudan a encontrar datos adecuados para un análisis.', answer: true, explain: 'Los metadatos (descripción, etiquetas, calidad) mejoran la búsqueda y selección.' },
  { id: 'cat4', type: 'tf', text: 'Un catálogo no necesita taxonomías ni etiquetas.', answer: false, explain: 'Taxonomías/etiquetas mejoran el orden y descubrimiento dentro del catálogo.' },
  { id: 'cat5', type: 'tf', text: 'El metadato “propietario” es clave para la gobernanza.', answer: true, explain: 'Acelera decisiones y clarifica responsabilidades.' },
  { id: 'cat6', type: 'tf', text: 'La calidad de metadatos impacta directamente la utilidad del catálogo.', answer: true, explain: 'Metadatos pobres dificultan el hallazgo y pueden conducir a mal uso del dato.' },
  { id: 'cat7', type: 'tf', text: 'Etiquetas coherentes facilitan encontrar datasets relacionados.', answer: true, explain: 'Etiquetar bien mejora el descubrimiento.' },
  { id: 'cat8', type: 'tf', text: 'Un catálogo sin buscador sigue siendo igual de útil.', answer: false, explain: 'El buscador es clave cuando crece el contenido.' },
  { id: 'cat9', type: 'tf', text: 'La fecha de actualización ayuda a elegir datos vigentes.', answer: true, explain: 'Evita usar información desactualizada.' },
  { id: 'cat10', type: 'tf', text: 'La participación de usuarios mejora la calidad del catálogo.', answer: true, explain: 'Sugerencias y correcciones elevan la utilidad.' },
  // Reserva off-topic
  { id: 'catx11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Mantener ordenadas carpetas personales no influye en catálogos de datos.', answer: false, explain: 'El orden personal también inspira mejores prácticas organizacionales.' },
  { id: 'catx12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Una buena documentación acelera el aprendizaje de herramientas.', answer: true, explain: 'Documentar reduce curva de aprendizaje.' },
  ],
  Propiedad: [
  { id: 'pro1', type: 'tf', text: 'El data owner es responsable del uso y calidad del dato.', answer: true, explain: 'Define reglas, prioriza mejoras y asume responsabilidad por el dato.' },
  { id: 'pro2', type: 'tf', text: 'Data steward y data owner siempre son la misma persona.', answer: false, explain: 'El steward opera el dato; el owner es responsable. Pueden ser roles distintos.' },
  { id: 'pro3', type: 'tf', text: 'Definir responsables aclara quién decide sobre cambios en el dato.', answer: true, explain: 'La asignación de roles evita ambigüedad y acelera decisiones.' },
  { id: 'pro4', type: 'tf', text: 'El data steward gestiona la calidad y tareas del día a día del dato.', answer: true, explain: 'Ayuda a que el dato esté bien cuidado y documentado.' },
  { id: 'pro5', type: 'tf', text: 'Sin propietarios definidos, la calidad tiende a mejorar.', answer: false, explain: 'Sin responsables claros, la calidad suele degradarse por falta de cuidado.' },
  { id: 'pro6', type: 'tf', text: 'La matriz RACI ayuda a clarificar roles y responsabilidades sobre el dato.', answer: true, explain: 'RACI = Responsable, Aprobador, Consultado e Informado. Sirve para definir quién hace qué.' },
  { id: 'pro7', type: 'tf', text: 'Definir sustitutos del propietario evita bloqueos por ausencias.', answer: true, explain: 'Garantiza continuidad de decisiones.' },
  { id: 'pro8', type: 'tf', text: 'Roles y límites claros reducen conflictos entre equipos.', answer: true, explain: 'Cada uno sabe qué puede decidir.' },
  { id: 'pro9', type: 'tf', text: 'Un owner puede delegar tareas pero no la responsabilidad final.', answer: true, explain: 'La rendición de cuentas sigue en el owner.' },
  { id: 'pro10', type: 'tf', text: 'Sin un modelo de roles, la gobernanza funciona igual de bien.', answer: false, explain: 'La falta de estructura genera retrasos y errores.' },
  // Reserva off-topic
  { id: 'prox11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Un cronograma claro ayuda a coordinar proyectos.', answer: true, explain: 'La planificación mejora la ejecución.' },
  { id: 'prox12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Las reuniones sin agenda suelen ser eficientes.', answer: false, explain: 'La agenda mejora foco y tiempos.' },
  ],
  Trazabilidad: [
  { id: 'tra1', type: 'tf', text: 'La trazabilidad permite conocer el origen y transformaciones del dato.', answer: true, explain: 'Registrar orígenes y procesos facilita auditorías y resolución de problemas.' },
  { id: 'tra2', type: 'tf', text: 'El linaje de datos no es relevante para auditorías.', answer: false, explain: 'El linaje es clave para demostrar dónde, cómo y por quién pasó el dato.' },
  { id: 'tra3', type: 'tf', text: 'El linaje ayuda a ver el impacto de cambios en las fuentes.', answer: true, explain: 'Saber de dónde viene el dato permite evaluar riesgos antes de cambiarlo.' },
  { id: 'tra4', type: 'tf', text: 'El linaje de datos describe el origen y las transformaciones del dato.', answer: true, explain: 'Es el rastro de dónde viene el dato y cómo cambió en el camino.' },
  { id: 'tra5', type: 'tf', text: 'Registrar transformaciones ayuda a reproducir resultados.', answer: true, explain: 'La reproducibilidad requiere conocer las transformaciones intermedias.' },
  { id: 'tra6', type: 'tf', text: 'Las herramientas de linaje pueden capturar orígenes de forma automática.', answer: true, explain: 'Reducen trabajo manual y errores.' },
  { id: 'tra7', type: 'tf', text: 'El linaje apoya el cumplimiento en auditorías.', answer: true, explain: 'Demuestra la ruta del dato y controles aplicados.' },
  { id: 'tra8', type: 'tf', text: 'No es útil registrar versiones de scripts de transformación.', answer: false, explain: 'Versionar scripts es clave para reproducir y auditar.' },
  { id: 'tra9', type: 'tf', text: 'Identificadores únicos ayudan a seguir registros entre sistemas.', answer: true, explain: 'Facilitan correlacionar eventos a través del flujo.' },
  { id: 'tra10', type: 'tf', text: 'La trazabilidad aumenta la confianza en reportes y decisiones.', answer: true, explain: 'Transparencia = mayor credibilidad.' },
  // Reserva off-topic
  { id: 'trax11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Anotar pasos a mano puede ayudar a recordar cambios.', answer: true, explain: 'Registrar pasos evita olvidar decisiones.' },
  { id: 'trax12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Los historiales de edición no sirven para aprender de errores.', answer: false, explain: 'Revisar historial ayuda a mejorar procesos.' },
  ],
  Políticas: [
  { id: 'pol1', type: 'tf', text: 'Las políticas de datos definen reglas de uso, acceso y retención.', answer: true, explain: 'Establecen el marco formal que guía el manejo y protección del dato.' },
  { id: 'pol2', type: 'tf', text: 'Si existen políticas, no se necesitan controles técnicos.', answer: false, explain: 'Política y controles se complementan: reglas + mecanismos para cumplirlas.' },
  { id: 'pol3', type: 'tf', text: 'Las políticas deben ser comunicadas y versionadas.', answer: true, explain: 'Comunicar y versionar mantiene a todos alineados con los cambios.' },
  { id: 'pol4', type: 'tf', text: 'Los procedimientos convierten políticas en pasos claros.', answer: true, explain: 'Son instrucciones para cumplir lo que dicen las políticas.' },
  { id: 'pol5', type: 'tf', text: 'Las políticas no aplican a datos no estructurados.', answer: false, explain: 'Las políticas aplican a todos los datos, estructurados o no.' },
  { id: 'pol6', type: 'tf', text: 'Las políticas deben indicar responsables y excepciones permitidas.', answer: true, explain: 'Aclaran quién decide y en qué casos.' },
  { id: 'pol7', type: 'tf', text: 'Sin capacitación, las políticas pueden no cumplirse.', answer: true, explain: 'La formación ayuda a aplicarlas correctamente.' },
  { id: 'pol8', type: 'tf', text: 'La política de retención define cuánto tiempo guardar datos.', answer: true, explain: 'Evita retener más de lo necesario.' },
  { id: 'pol9', type: 'tf', text: 'Las sanciones pueden ayudar a hacer cumplir las políticas.', answer: true, explain: 'Refuerzan la importancia del cumplimiento.' },
  { id: 'pol10', type: 'tf', text: 'No es necesario medir el cumplimiento de políticas.', answer: false, explain: 'Medir permite mejorar y corregir desviaciones.' },
  // Reserva off-topic
  { id: 'polx11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Tener normas de convivencia mejora el trabajo en equipo.', answer: true, explain: 'Reglas claras facilitan colaboración.' },
  { id: 'polx12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Las reglas claras empeoran la comunicación.', answer: false, explain: 'Claridad mejora la comunicación.' },
  ],
  Interoperabilidad: [
  { id: 'int1', type: 'tf', text: 'Los estándares y formatos abiertos mejoran la interoperabilidad.', answer: true, explain: 'Facilitan el intercambio al reducir dependencias de proveedor.' },
  { id: 'int2', type: 'tf', text: 'La interoperabilidad solo importa entre sistemas internos.', answer: false, explain: 'También es clave para integraciones con socios, clientes y terceros.' },
  { id: 'int3', type: 'tf', text: 'Las API bien documentadas facilitan la integración entre sistemas.', answer: true, explain: 'API = Interfaz de Programación de Aplicaciones. Una buena documentación evita errores al conectar sistemas.' },
  { id: 'int4', type: 'tf', text: 'JSON (JavaScript Object Notation) es un formato común para intercambio de datos.', answer: true, explain: 'Es ligero, legible y ampliamente soportado.' },
  { id: 'int5', type: 'tf', text: 'Los esquemas y contratos evitan rupturas entre integraciones.', answer: true, explain: 'Los contratos estables permiten compatibilidad y evolución controlada.' },
  { id: 'int6', type: 'tf', text: 'Versionar las API ayuda a mantener compatibilidad mientras evolucionan.', answer: true, explain: 'API = Interfaz de Programación de Aplicaciones. Versionar evita romper clientes existentes y permite introducir cambios de forma controlada.' },
  { id: 'int7', type: 'tf', text: 'Las pruebas de contrato detectan rupturas temprano.', answer: true, explain: 'Validan que los acuerdos entre servicios sigan válidos.' },
  { id: 'int8', type: 'tf', text: 'Alinear tipos y codificaciones evita errores de interpretación.', answer: true, explain: 'Conviene acordar juegos de caracteres y tipos.' },
  { id: 'int9', type: 'tf', text: 'La interoperabilidad mejora con documentación y ejemplos de uso.', answer: true, explain: 'Ejemplos reducen ambigüedades al integrar.' },
  { id: 'int10', type: 'tf', text: 'Ignorar versiones de una API rara vez causa problemas.', answer: false, explain: 'Rompe clientes y genera fallos en producción.' },
  // Reserva off-topic
  { id: 'intx11', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Nombres claros en variables ayudan a entender el código.', answer: true, explain: 'Claridad mejora mantenimiento.' },
  { id: 'intx12', type: 'tf', offTopic: true, text: 'Nota: esta pregunta está un poco salida del tema (reserva). Copiar y pegar datos a mano siempre es mejor que automatizar.', answer: false, explain: 'La automatización reduce errores humanos.' },
  ],
}

export function getRandomQuestion(categoryLabel, usedIdsSet = new Set(), extraQuestions = []) {
  const arr = [...(baseByCat[categoryLabel] || []), ...(extraQuestions || [])]
  if (!arr.length) return null
  // Priorizamos preguntas del tema (no offTopic). Si se agotan, usamos las de reserva (offTopic).
  const notUsed = arr.filter(q => !usedIdsSet.has(q.id))
  const mainPool = notUsed.filter(q => !q.offTopic)
  const reservePool = notUsed.filter(q => q.offTopic)
  const source = mainPool.length ? mainPool : (reservePool.length ? reservePool : arr)
  const idx = Math.floor(Math.random() * source.length)
  return source[idx]
}

export default baseByCat
