export class AuthorizationError extends Error {
  constructor(
    message: string,
    private _error?: unknown
  ) {
    super(message);
    this.name = 'AuthorizationError';
  }

  get error() {
    return this._error;
  }
}
