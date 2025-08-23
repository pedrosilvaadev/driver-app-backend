import { HttpException, HttpStatus } from "@nestjs/common";

export class RideIsNotInProgressError extends HttpException {
  constructor() {
    super("Ride is not in progress", HttpStatus.BAD_REQUEST);
  }
}
