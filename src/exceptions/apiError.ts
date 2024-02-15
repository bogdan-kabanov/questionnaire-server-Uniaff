class ApiError extends Error {
  status: number;
  message: string;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
      super(message);
      this.status = status;
      this.message = message;
      this.errors = errors;
  }

  static UnauthorizedError() {
      return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message: string, errors: any[] = []) {
      return new ApiError(400, message, errors);
  }

  static NotFound(message: string, errors: any[] = []) {
      return new ApiError(404, message, errors);
  }
}
export default ApiError;
