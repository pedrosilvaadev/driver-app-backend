export class RideIsNotInProgressError extends Error {
  constructor() {
    super("Ride is not in progress");
    this.name = "RideIsNotInProgressError";
  }
}
