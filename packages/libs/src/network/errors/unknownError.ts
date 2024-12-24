export class UnknownError extends Error {
  constructor(
    message: string,
    private _error?: unknown
  ) {
    super(message);
    this.name = 'UnknownError';
  }

  get error() {
    return this._error;
  }
}
