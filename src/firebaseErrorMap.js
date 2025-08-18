// Mapeo de errores de Firebase Auth a mensajes en español
export const firebaseErrorMap = {
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/user-disabled': 'La cuenta ha sido deshabilitada.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/email-already-in-use': 'El correo ya está registrado.',
  'auth/weak-password': 'La contraseña es demasiado débil.',
  'auth/missing-password': 'Debes ingresar una contraseña.',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
  'auth/network-request-failed': 'Error de red. Verifica tu conexión.',
  'auth/invalid-credential': 'Las credenciales ingresadas no son válidas.',
  // Puedes agregar más códigos según lo necesites
}

export function getFirebaseErrorMsg(error) {
  if (!error) return 'Error desconocido.'
  if (typeof error === 'string' && firebaseErrorMap[error]) return firebaseErrorMap[error]
  if (error.code && firebaseErrorMap[error.code]) return firebaseErrorMap[error.code]
  return error.message || 'Error desconocido.'
}
