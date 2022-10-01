export class HttpError extends Error {
  constructor(statusCode, message, data) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
export class ValidationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
