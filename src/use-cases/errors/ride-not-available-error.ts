import { HttpException, HttpStatus } from "@nestjs/common";

export class RideNotAvailableError extends HttpException {
  constructor() {
    super("Ride is not available", HttpStatus.BAD_REQUEST);
  }
}
