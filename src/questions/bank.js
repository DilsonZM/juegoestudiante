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
  // Nuevas para equilibrar (falsas)
  { id: 'cal11', type: 'tf', text: 'La calidad de datos solo importa para reportes y no para operaciones diarias.', answer: false, explain: 'Las operaciones también dependen de datos correctos; errores impactan procesos y clientes.' },
  { id: 'cal12', type: 'tf', text: 'Con suficiente volumen, los errores de calidad se compensan solos.', answer: false, explain: 'Más volumen no corrige sesgos ni errores; puede amplificarlos.' },
  { id: 'cal13', type: 'tf', text: 'Eliminar validaciones acelera y mantiene la calidad estable.', answer: false, explain: 'Quitar controles aumenta errores y retrabajo; baja la calidad.' },
  { id: 'cal14', type: 'tf', text: 'La consistencia entre sistemas es opcional si el equipo se comunica bien.', answer: false, explain: 'La inconsistencia genera decisiones distintas sobre la misma información.' },
  { id: 'cal15', type: 'tf', text: 'No es necesario medir la calidad si los usuarios están conformes.', answer: false, explain: 'Medir permite detectar y corregir problemas de forma objetiva.' },
  // Nuevas para completar 20 (2 verdaderas, 3 falsas)
  { id: 'cal16', type: 'tf', text: 'Definir umbrales y KPI de calidad permite monitorear desviaciones.', answer: true, explain: 'Indicadores objetivos ayudan a detectar y priorizar correcciones.' },
  { id: 'cal17', type: 'tf', text: 'La calidad de datos es responsabilidad exclusiva del área de TI.', answer: false, explain: 'Es responsabilidad compartida con el negocio (propietarios y stewards).' },
  { id: 'cal18', type: 'tf', text: 'Muestreos y controles estadísticos ayudan a detectar anomalías en los datos.', answer: true, explain: 'El control estadístico permite encontrar errores sistemáticos o atípicos.' },
  { id: 'cal19', type: 'tf', text: 'Los datos maestros no requieren reglas de deduplicación.', answer: false, explain: 'La deduplicación es clave para evitar registros duplicados en maestros.' },
  { id: 'cal20', type: 'tf', text: 'Mejorar la calidad una vez al año es suficiente para cualquier organización.', answer: false, explain: 'La mejora continua es necesaria; la calidad cambia con los procesos.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'seg11', type: 'tf', text: 'El antivirus reemplaza la necesidad de aplicar parches de seguridad.', answer: false, explain: 'Son controles complementarios; parches corrigen vulnerabilidades.' },
  { id: 'seg12', type: 'tf', text: 'Usar la misma contraseña en todos los sistemas es una buena práctica.', answer: false, explain: 'Reutilizar contraseñas incrementa el riesgo por brechas en cascada.' },
  { id: 'seg13', type: 'tf', text: 'Compartir accesos administrativos entre varias personas mejora el control.', answer: false, explain: 'Las cuentas personales trazables son clave para la responsabilidad.' },
  { id: 'seg14', type: 'tf', text: 'Los logs de seguridad no aportan valor para detectar incidentes.', answer: false, explain: 'La observabilidad es esencial para detectar y responder incidentes.' },
  { id: 'seg15', type: 'tf', text: 'El cifrado hace que las copias de respaldo sean innecesarias.', answer: false, explain: 'Respaldo y cifrado cubren riesgos distintos: pérdida vs. confidencialidad.' },
  // Nuevas para completar 20 (2 verdaderas, 3 falsas)
  { id: 'seg16', type: 'tf', text: 'La segregación de funciones reduce el riesgo de fraude interno.', answer: true, explain: 'Separar tareas críticas evita que una sola persona complete todo el flujo.' },
  { id: 'seg17', type: 'tf', text: 'Usar HTTPS en una intranet es innecesario.', answer: false, explain: 'El cifrado en tránsito protege contra escuchas incluso en redes internas.' },
  { id: 'seg18', type: 'tf', text: 'Las soluciones DLP ayudan a prevenir fuga de información.', answer: true, explain: 'Data Loss Prevention detecta y bloquea exfiltraciones no autorizadas.' },
  { id: 'seg19', type: 'tf', text: 'No es relevante bloquear la pantalla en ausencias cortas.', answer: false, explain: 'Bloquear la sesión evita accesos no autorizados incluso por segundos.' },
  { id: 'seg20', type: 'tf', text: 'El phishing se evita instalando más antivirus.', answer: false, explain: 'El antivirus no sustituye la concienciación ni filtros antiphishing.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'pri11', type: 'tf', text: 'Si un usuario publica su correo en internet, cualquiera puede usarlo para cualquier fin.', answer: false, explain: 'La licitud del tratamiento no depende solo de que algo sea público.' },
  { id: 'pri12', type: 'tf', text: 'No hace falta informar al titular sobre el uso de sus datos si es obvio.', answer: false, explain: 'La transparencia exige informar finalidades y derechos.' },
  { id: 'pri13', type: 'tf', text: 'La seudonimización garantiza que nadie pueda reidentificar.', answer: false, explain: 'Puede reidentificarse con datos auxiliares; no equivale a anonimizar.' },
  { id: 'pri14', type: 'tf', text: 'Los derechos de los titulares pueden ignorarse si es costoso atenderlos.', answer: false, explain: 'Los derechos aplican conforme a la normativa; el costo no los invalida.' },
  { id: 'pri15', type: 'tf', text: 'El principio de minimización permite recolectar “por si acaso”.', answer: false, explain: 'Recolectar solo lo necesario para fines específicos.' },
  // Nuevas para completar 20 (3 verdaderas, 2 falsas)
  { id: 'pri16', type: 'tf', text: 'Las evaluaciones de impacto en privacidad (PIA/DPIA) ayudan a identificar riesgos.', answer: true, explain: 'Permiten diseñar mitigaciones antes de implementar el tratamiento.' },
  { id: 'pri17', type: 'tf', text: 'El titular puede solicitar la supresión de sus datos en ciertos casos.', answer: true, explain: 'El derecho de supresión aplica cuando desaparece la finalidad u otros supuestos.' },
  { id: 'pri18', type: 'tf', text: 'Las cookies siempre pueden instalarse sin informar al usuario.', answer: false, explain: 'Se debe informar y, en su caso, recabar consentimiento.' },
  { id: 'pri19', type: 'tf', text: 'Debe mantenerse un registro de consentimientos otorgados y su alcance.', answer: true, explain: 'La trazabilidad del consentimiento es necesaria para demostrar licitud.' },
  { id: 'pri20', type: 'tf', text: 'Es válido compartir datos personales con terceros sin contrato ni garantías.', answer: false, explain: 'Se requieren acuerdos y garantías de protección adecuadas.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'cat11', type: 'tf', text: 'Un catálogo es solo una vitrina; no necesita gobierno ni procesos.', answer: false, explain: 'Requiere cuidado continuo: roles, calidad de metadatos y procesos.' },
  { id: 'cat12', type: 'tf', text: 'Es mejor permitir descripciones libres sin estructura en el catálogo.', answer: false, explain: 'Plantillas y campos estructurados mejoran la búsqueda y calidad.' },
  { id: 'cat13', type: 'tf', text: 'Actualizar metadatos no es necesario si el dataset cambia poco.', answer: false, explain: 'La vigencia de metadatos es clave para la confianza y el reuso.' },
  { id: 'cat14', type: 'tf', text: 'Los responsables de datos no deben figurar en el catálogo.', answer: false, explain: 'El contacto/responsable facilita soporte y decisiones.' },
  { id: 'cat15', type: 'tf', text: 'Un catálogo sin control de calidad funciona igual que uno curado.', answer: false, explain: 'La curaduría mejora utilidad, precisión y adopción.' },
  // Nuevas para completar 20 (2 verdaderas, 3 falsas)
  { id: 'cat16', type: 'tf', text: 'Definir campos obligatorios en metadatos mejora la calidad del catálogo.', answer: true, explain: 'Obligatoriedad mínima evita registros incompletos o ambiguos.' },
  { id: 'cat17', type: 'tf', text: 'La búsqueda semántica nunca aporta valor en catálogos.', answer: false, explain: 'Puede mejorar el descubrimiento al entender intención y sinónimos.' },
  { id: 'cat18', type: 'tf', text: 'No es necesario versionar datasets publicados.', answer: false, explain: 'El versionado permite reproducibilidad y comunicación de cambios.' },
  { id: 'cat19', type: 'tf', text: 'Métricas de uso ayudan a priorizar mejoras en metadatos y datasets.', answer: true, explain: 'El uso real orienta dónde invertir esfuerzos de curaduría.' },
  { id: 'cat20', type: 'tf', text: 'El catálogo debe almacenar los datos, no solo metadatos.', answer: false, explain: 'El catálogo referencia y documenta; no reemplaza los repositorios de datos.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'pro11', type: 'tf', text: 'Designar múltiples owners por dato siempre reduce ambigüedad.', answer: false, explain: 'Demasiados owners diluyen la responsabilidad; debe haber claridad.' },
  { id: 'pro12', type: 'tf', text: 'La ausencia de responsables no afecta los tiempos de respuesta.', answer: false, explain: 'Sin responsables, las decisiones se retrasan y la calidad sufre.' },
  { id: 'pro13', type: 'tf', text: 'El owner puede transferir la rendición de cuentas a cualquier rol.', answer: false, explain: 'Puede delegar tareas, no la responsabilidad final.' },
  { id: 'pro14', type: 'tf', text: 'No es necesario documentar reemplazos del owner en vacaciones.', answer: false, explain: 'Definir sustitutos evita bloqueos operativos.' },
  { id: 'pro15', type: 'tf', text: 'Un RACI complejo siempre es mejor que un RACI simple.', answer: false, explain: 'La claridad prima sobre la complejidad; evita confusión.' },
  // Nuevas para completar 20 (3 verdaderas, 2 falsas)
  { id: 'pro16', type: 'tf', text: 'Definir KPI de calidad por cada owner ayuda a rendir cuentas.', answer: true, explain: 'Los indicadores facilitan seguimiento y priorización de mejoras.' },
  { id: 'pro17', type: 'tf', text: 'Cambiar el owner de un dato cada semana mejora la agilidad.', answer: false, explain: 'La rotación frecuente genera confusión y diluye responsabilidades.' },
  { id: 'pro18', type: 'tf', text: 'Los comités de datos ayudan a resolver conflictos y tomar decisiones.', answer: true, explain: 'Gobernanza colegiada alinea áreas y acelera acuerdos.' },
  { id: 'pro19', type: 'tf', text: 'La rendición de cuentas no aplica a datos no críticos.', answer: false, explain: 'Todos los datos requieren responsables con rendición de cuentas.' },
  { id: 'pro20', type: 'tf', text: 'Documentar roles en el catálogo mejora la visibilidad de responsables.', answer: true, explain: 'Permite ubicar owners/stewards y solicitar soporte.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'tra11', type: 'tf', text: 'Si el equipo recuerda los pasos, no hace falta documentar el linaje.', answer: false, explain: 'La memoria es falible; se requiere registro verificable.' },
  { id: 'tra12', type: 'tf', text: 'El linaje solo interesa a TI, no al negocio.', answer: false, explain: 'Ambos lo usan: impacto de cambios, calidad y auditorías.' },
  { id: 'tra13', type: 'tf', text: 'Las transformaciones manuales no necesitan trazabilidad.', answer: false, explain: 'Toda transformación relevante debe quedar registrada.' },
  { id: 'tra14', type: 'tf', text: 'Versionar scripts es innecesario si hay backups.', answer: false, explain: 'Versionado y backup resuelven problemas distintos.' },
  { id: 'tra15', type: 'tf', text: 'El linaje no ayuda a resolver discrepancias entre reportes.', answer: false, explain: 'Permite ubicar dónde cambió el dato y por qué.' },
  // Nuevas para completar 20 (2 verdaderas, 3 falsas)
  { id: 'tra16', type: 'tf', text: 'Capturar el ID de ejecución y parámetros mejora la reproducibilidad.', answer: true, explain: 'Permite repetir un proceso con exactitud y auditarlo.' },
  { id: 'tra17', type: 'tf', text: 'El linaje puede omitirse en pipelines por lotes (batch).', answer: false, explain: 'Batch o streaming, el linaje sigue siendo necesario para auditar.' },
  { id: 'tra18', type: 'tf', text: 'Automatizar la captura de linaje en ETL/ELT facilita auditorías.', answer: true, explain: 'Reduce errores manuales y mejora cobertura del linaje.' },
  { id: 'tra19', type: 'tf', text: 'No hace falta registrar versiones de las fuentes de datos.', answer: false, explain: 'Las versiones permiten rastrear cambios e impactos.' },
  { id: 'tra20', type: 'tf', text: 'Los catálogos no deben incluir información de linaje.', answer: false, explain: 'Linaje + metadatos en el catálogo incrementan la confianza y trazabilidad.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'pol11', type: 'tf', text: 'Las políticas por sí solas garantizan el cumplimiento sin capacitación.', answer: false, explain: 'Se requiere formación, procesos y controles.' },
  { id: 'pol12', type: 'tf', text: 'Versionar políticas es innecesario si se comunican por correo.', answer: false, explain: 'El versionado controla cambios y asegura trazabilidad.' },
  { id: 'pol13', type: 'tf', text: 'Las excepciones nunca deben documentarse.', answer: false, explain: 'Documentarlas permite controlarlas y aprender de ellas.' },
  { id: 'pol14', type: 'tf', text: 'Medir cumplimiento puede omitirse si no hay auditorías externas.', answer: false, explain: 'La mejora continua requiere medición, haya o no auditorías.' },
  { id: 'pol15', type: 'tf', text: 'Las políticas no aplican a proveedores ni terceros.', answer: false, explain: 'Alcance y obligaciones deben incluir terceros.' },
  // Nuevas para completar 20 (3 verdaderas, 2 falsas)
  { id: 'pol16', type: 'tf', text: 'Las políticas deben alinearse con leyes y regulaciones vigentes.', answer: true, explain: 'El marco normativo guía el contenido y su aplicación.' },
  { id: 'pol17', type: 'tf', text: 'No hace falta publicar las políticas a los usuarios afectados.', answer: false, explain: 'La comunicación y disponibilidad son requisitos para el cumplimiento.' },
  { id: 'pol18', type: 'tf', text: 'Debe definirse el proceso de aprobación y control de excepciones.', answer: true, explain: 'Las excepciones controladas requieren trazabilidad y responsables.' },
  { id: 'pol19', type: 'tf', text: 'Las políticas pueden ser contradictorias entre sí sin problema.', answer: false, explain: 'La coherencia es clave para evitar ambigüedad e incumplimientos.' },
  { id: 'pol20', type: 'tf', text: 'Revisiones periódicas por un comité aseguran vigencia y efectividad.', answer: true, explain: 'La gobernanza debe mantenerlas actualizadas y efectivas.' },
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
  // Nuevas para equilibrar (falsas)
  { id: 'int11', type: 'tf', text: 'Si dos sistemas “hablan” JSON, ya no se necesitan contratos.', answer: false, explain: 'El contrato define estructura y semántica; formato no basta.' },
  { id: 'int12', type: 'tf', text: 'La documentación de APIs puede omitirse si el código es claro.', answer: false, explain: 'La doc publica y ejemplos reducen errores de integración.' },
  { id: 'int13', type: 'tf', text: 'Cambiar un campo en la API sin comunicar no afecta a los clientes.', answer: false, explain: 'Es ruptura silenciosa; se debe versionar y comunicar.' },
  { id: 'int14', type: 'tf', text: 'Las pruebas de contrato sobran cuando hay tests unitarios.', answer: false, explain: 'Validan la compatibilidad entre servicios, no solo lógica interna.' },
  { id: 'int15', type: 'tf', text: 'Los esquemas no deben validar tipos para evitar rechazos.', answer: false, explain: 'Validar tipos previene errores de interpretación y fallos.' },
  // Nuevas para completar 20 (2 verdaderas, 3 falsas)
  { id: 'int16', type: 'tf', text: 'Definir OpenAPI/JSON Schema facilita integraciones consistentes.', answer: true, explain: 'Contratos claros reducen rupturas y malentendidos.' },
  { id: 'int17', type: 'tf', text: 'La codificación de caracteres (p. ej., UTF-8) es irrelevante para integrar.', answer: false, explain: 'Acordar codificación evita errores de caracteres y datos corruptos.' },
  { id: 'int18', type: 'tf', text: 'Las pruebas de compatibilidad hacia atrás ayudan en cambios de API.', answer: true, explain: 'Garantizan que clientes antiguos sigan funcionando.' },
  { id: 'int19', type: 'tf', text: 'Se pueden cambiar nombres de campos en producción sin previo aviso.', answer: false, explain: 'Es ruptura; se debe versionar y comunicar cambios.' },
  { id: 'int20', type: 'tf', text: 'No es necesario documentar límites de tasa (rate limits) ni tiempos de respuesta.', answer: false, explain: 'Son parte del contrato de servicio y su SLO.' },
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
