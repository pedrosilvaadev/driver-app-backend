export class DriverAlreadyExistsError extends Error {
  constructor() {
    super('Driver with this email already exists.');
    this.name = 'DriverAlreadyExistsError';
  }
}
