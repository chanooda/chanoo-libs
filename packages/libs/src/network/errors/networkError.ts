export class NetworkError extends Error {
  constructor(
    message: string,
    private _error?: unknown
  ) {
    super(message);
    this.name = 'NetworkError';
  }

  get error() {
    return this._error;
  }
}
