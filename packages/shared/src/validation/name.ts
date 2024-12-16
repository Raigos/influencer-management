export const MAX_NAME_LENGTH = 50

export const nameValidationErrors = {
  INVALID_FIRST_NAME: 'First name must be between 1 and 50 characters',
  INVALID_LAST_NAME: 'Last name must be between 1 and 50 characters',
  INVALID_MANAGER_NAME: 'Manager name must be between 1 and 50 characters',
}

export const isValidName = (name: unknown): boolean => {
  return typeof name === 'string' && name.trim().length > 0 && name.trim().length <= MAX_NAME_LENGTH
}
