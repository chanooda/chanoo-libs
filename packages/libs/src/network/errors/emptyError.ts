export class EmptyError extends Error {
  constructor(
    message: string,
    private _error?: unknown
  ) {
    super(message);
    this.name = 'EmptyError';
  }

  get error() {
    return this._error;
  }
}
