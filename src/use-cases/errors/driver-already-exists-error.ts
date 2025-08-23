import { HttpException, HttpStatus } from "@nestjs/common";

export class DriverAlreadyExistsError extends HttpException {
  constructor() {
    super("Driver with this email already exists.", HttpStatus.CONFLICT);
  }
}
