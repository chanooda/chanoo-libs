export class ServerError extends Error {
  constructor(
    message: string,
    private _error?: unknown
  ) {
    super(message);
    this.name = 'ServerError';
  }

  get error() {
    return this._error;
  }
}
