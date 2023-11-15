export function evalErrorResponse(errorResponse) {
  let errors = {};
  if (Object.keys(errorResponse).indexOf('error') != -1) {
    for (const key of Object.keys(errorResponse.error)) {
      const message = errorResponse.error[key];
      errors[key] = message;
    }
  } else {
    errors['message'] = errorResponse.message;
  }
  return errors;
}
