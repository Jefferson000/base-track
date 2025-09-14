const ERROR_CODES = {
  DUPLICATE_ENTITY: "DUPLICATE_ENTITY",
  ENTITY_NOT_FOUND: "ENTITY_NOT_FOUND",
  ENTITIES_NOT_FOUND: "ENTITIES_NOT_FOUND",
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  FOREIGN_KEY_VIOLATION: "FOREIGN_KEY_VIOLATION",
  FIELD_VALIDATION: "FIELD_VALIDATION",
  WRONG_CREDENTIALS: "WRONG_CREDENTIALS",
  FAIL_IMAGE_UPLOAD: "FAIL_IMAGE_UPLOAD",
  FAIL_SEND_EMAIL: "FAIL_SEND_EMAIL",
  NO_DEFAUT_EMAIL: 'NO_DEFAUT_EMAIL',
  EMAIL_DUPLICATED: 'EMAIL_DUPLICATED',
  ID_DUPLICATED: 'ID_DUPLICATED',
  NAME_DUPLICATED: 'NAME_DUPLICATED'
};
const ERROR_MESSAGES = {
  DUPLICATE_ENTITY: "Duplicación de datos.",
  ENTITY_NOT_FOUND: "No se encontró registro",
  ENTITIES_NOT_FOUND: "No se encontraron registros",
  DATABASE_ERROR: "Error interno 01, contacte soporte",
  INTERNAL_SERVER_ERROR: "Error interno 02, contacte soporte",
  VALIDATION_ERROR: "Datos proporcionados inválidos.",
  FOREIGN_KEY_VIOLATION: "Hay dependencia en otro registro",
  FIELD_VALIDATION: "Campos con datos inválidos",
  WRONG_CREDENTIALS: "Credenciales Incorrectas.",
  FAIL_IMAGE_UPLOAD: "Error al subir imagen",
  FAIL_SEND_EMAIL: "Error al enviar correo",
  NO_DEFAUT_EMAIL: "No hay una plantilla de correo por defecto.",
  EMAIL_DUPLICATED: 'Correo ya registrado.',
  ID_DUPLICATED: 'Cédula jurídica ya registrada.',
  NAME_DUPLICATED: ' Nombre ya registrado.'
};
export { ERROR_CODES, ERROR_MESSAGES };
