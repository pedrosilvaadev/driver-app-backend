export class RideNotAvailableError extends Error {
  constructor() {
    super("Ride is not available");
    this.name = "RideNotAvailableError";
  }
}
