class AppError {
  constructor(message = '', data = null, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default AppError;
