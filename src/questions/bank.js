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
  ],
  Seguridad: [
  { id: 'seg1', type: 'tf', text: 'El control de acceso limita quién puede ver o modificar datos.', answer: true, explain: 'Sirve para que solo personas autorizadas entren o cambien la información.' },
  { id: 'seg2', type: 'tf', text: 'El cifrado sirve solo para datos en reposo.', answer: false, explain: 'El cifrado aplica en reposo y en tránsito; ambos son necesarios para proteger la confidencialidad.' },
  { id: 'seg3', type: 'tf', text: 'La autenticación multifactor reduce el riesgo de acceso no autorizado.', answer: true, explain: 'Agregar un segundo factor (algo que tienes) mitiga robo de contraseñas.' },
  { id: 'seg4', type: 'tf', text: 'ISO/IEC 27001 es un estándar de gestión de seguridad de la información.', answer: true, explain: 'Define requisitos de un SGSI (sistema de gestión de seguridad de la información).' },
  { id: 'seg5', type: 'tf', text: 'Los respaldos forman parte de los controles de seguridad.', answer: true, explain: 'Las copias de seguridad permiten recuperar datos ante incidentes y mejoran la resiliencia.' },
  { id: 'seg6', type: 'tf', text: 'El principio de mínimo privilegio sugiere otorgar solo el acceso estrictamente necesario.', answer: true, explain: 'Reduce la superficie de ataque y el impacto de cuentas comprometidas.' },
  ],
  Privacidad: [
  { id: 'pri1', type: 'tf', text: 'La minimización de datos busca recolectar solo lo necesario.', answer: true, explain: 'Recolectar y procesar lo mínimo reduce riesgo y cumple principios de privacidad.' },
  { id: 'pri2', type: 'tf', text: 'Los datos personales siempre pueden hacerse públicos si están en internet.', answer: false, explain: 'Que algo esté en internet no significa que puedas usarlo libremente.' },
  { id: 'pri3', type: 'tf', text: 'El consentimiento es un fundamento común para tratar datos personales.', answer: true, explain: 'Además del consentimiento, existen otros fundamentos como obligación legal o interés legítimo.' },
  { id: 'pri4', type: 'tf', text: 'Privacidad por diseño integra privacidad desde el diseño y por defecto.', answer: true, explain: 'Es un enfoque proactivo que previene en lugar de corregir.' },
  { id: 'pri5', type: 'tf', text: 'Anonimizar y seudonimizar son exactamente lo mismo.', answer: false, explain: 'Anonimizar elimina el vínculo con el individuo; seudonimizar lo oculta, pero puede reidentificarse.' },
  { id: 'pri6', type: 'tf', text: 'La portabilidad de datos permite al titular obtener y reutilizar sus datos.', answer: true, explain: 'Es un derecho en varias normativas; fomenta competencia y control del usuario.' },
  ],
  Catálogo: [
  { id: 'cat1', type: 'tf', text: 'Un catálogo de datos facilita descubrir y entender conjuntos de datos.', answer: true, explain: 'Centraliza metadatos, descripciones y responsables para acelerar el hallazgo.' },
  { id: 'cat2', type: 'tf', text: 'Un diccionario de datos describe campos y su significado.', answer: true, explain: 'Explica qué es cada campo y cómo se usa.' },
  { id: 'cat3', type: 'tf', text: 'Los metadatos ayudan a encontrar datos adecuados para un análisis.', answer: true, explain: 'Los metadatos (descripción, etiquetas, calidad) mejoran la búsqueda y selección.' },
  { id: 'cat4', type: 'tf', text: 'Un catálogo no necesita taxonomías ni etiquetas.', answer: false, explain: 'Taxonomías/etiquetas mejoran el orden y descubrimiento dentro del catálogo.' },
  { id: 'cat5', type: 'tf', text: 'El metadato “propietario” es clave para la gobernanza.', answer: true, explain: 'Acelera decisiones y clarifica responsabilidades.' },
  { id: 'cat6', type: 'tf', text: 'La calidad de metadatos impacta directamente la utilidad del catálogo.', answer: true, explain: 'Metadatos pobres dificultan el hallazgo y pueden conducir a mal uso del dato.' },
  ],
  Propiedad: [
  { id: 'pro1', type: 'tf', text: 'El data owner es responsable del uso y calidad del dato.', answer: true, explain: 'Define reglas, prioriza mejoras y asume responsabilidad por el dato.' },
  { id: 'pro2', type: 'tf', text: 'Data steward y data owner siempre son la misma persona.', answer: false, explain: 'El steward opera el dato; el owner es responsable. Pueden ser roles distintos.' },
  { id: 'pro3', type: 'tf', text: 'Definir responsables aclara quién decide sobre cambios en el dato.', answer: true, explain: 'La asignación de roles evita ambigüedad y acelera decisiones.' },
  { id: 'pro4', type: 'tf', text: 'El data steward gestiona la calidad y tareas del día a día del dato.', answer: true, explain: 'Ayuda a que el dato esté bien cuidado y documentado.' },
  { id: 'pro5', type: 'tf', text: 'Sin propietarios definidos, la calidad tiende a mejorar.', answer: false, explain: 'Sin responsables claros, la calidad suele degradarse por falta de cuidado.' },
  { id: 'pro6', type: 'tf', text: 'La matriz RACI ayuda a clarificar roles y responsabilidades sobre el dato.', answer: true, explain: 'RACI = Responsable, Aprobador, Consultado e Informado. Sirve para definir quién hace qué.' },
  ],
  Trazabilidad: [
  { id: 'tra1', type: 'tf', text: 'La trazabilidad permite conocer el origen y transformaciones del dato.', answer: true, explain: 'Registrar orígenes y procesos facilita auditorías y resolución de problemas.' },
  { id: 'tra2', type: 'tf', text: 'El linaje de datos no es relevante para auditorías.', answer: false, explain: 'El linaje es clave para demostrar dónde, cómo y por quién pasó el dato.' },
  { id: 'tra3', type: 'tf', text: 'El linaje ayuda a ver el impacto de cambios en las fuentes.', answer: true, explain: 'Saber de dónde viene el dato permite evaluar riesgos antes de cambiarlo.' },
  { id: 'tra4', type: 'tf', text: 'El linaje de datos describe el origen y las transformaciones del dato.', answer: true, explain: 'Es el rastro de dónde viene el dato y cómo cambió en el camino.' },
  { id: 'tra5', type: 'tf', text: 'Registrar transformaciones ayuda a reproducir resultados.', answer: true, explain: 'La reproducibilidad requiere conocer las transformaciones intermedias.' },
  ],
  Políticas: [
  { id: 'pol1', type: 'tf', text: 'Las políticas de datos definen reglas de uso, acceso y retención.', answer: true, explain: 'Establecen el marco formal que guía el manejo y protección del dato.' },
  { id: 'pol2', type: 'tf', text: 'Si existen políticas, no se necesitan controles técnicos.', answer: false, explain: 'Política y controles se complementan: reglas + mecanismos para cumplirlas.' },
  { id: 'pol3', type: 'tf', text: 'Las políticas deben ser comunicadas y versionadas.', answer: true, explain: 'Comunicar y versionar mantiene a todos alineados con los cambios.' },
  { id: 'pol4', type: 'tf', text: 'Los procedimientos convierten políticas en pasos claros.', answer: true, explain: 'Son instrucciones para cumplir lo que dicen las políticas.' },
  { id: 'pol5', type: 'tf', text: 'Las políticas no aplican a datos no estructurados.', answer: false, explain: 'Las políticas aplican a todos los datos, estructurados o no.' },
  ],
  Interoperabilidad: [
  { id: 'int1', type: 'tf', text: 'Los estándares y formatos abiertos mejoran la interoperabilidad.', answer: true, explain: 'Facilitan el intercambio al reducir dependencias de proveedor.' },
  { id: 'int2', type: 'tf', text: 'La interoperabilidad solo importa entre sistemas internos.', answer: false, explain: 'También es clave para integraciones con socios, clientes y terceros.' },
  { id: 'int3', type: 'tf', text: 'Las API bien documentadas facilitan la integración entre sistemas.', answer: true, explain: 'API = Interfaz de Programación de Aplicaciones. Una buena documentación evita errores al conectar sistemas.' },
  { id: 'int4', type: 'tf', text: 'JSON (JavaScript Object Notation) es un formato común para intercambio de datos.', answer: true, explain: 'Es ligero, legible y ampliamente soportado.' },
  { id: 'int5', type: 'tf', text: 'Los esquemas y contratos evitan rupturas entre integraciones.', answer: true, explain: 'Los contratos estables permiten compatibilidad y evolución controlada.' },
  { id: 'int6', type: 'tf', text: 'Versionar las API ayuda a mantener compatibilidad mientras evolucionan.', answer: true, explain: 'API = Interfaz de Programación de Aplicaciones. Versionar evita romper clientes existentes y permite introducir cambios de forma controlada.' },
  ],
}

export function getRandomQuestion(categoryLabel, usedIdsSet = new Set(), extraQuestions = []) {
  const arr = [...(baseByCat[categoryLabel] || []), ...(extraQuestions || [])]
  if (!arr.length) return null
  const pool = arr.filter(q => !usedIdsSet.has(q.id))
  const source = pool.length ? pool : arr
  const idx = Math.floor(Math.random() * source.length)
  return source[idx]
}

export default baseByCat
