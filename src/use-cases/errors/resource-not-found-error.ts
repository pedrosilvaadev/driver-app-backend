import { HttpException, HttpStatus } from "@nestjs/common";

export class ResourceNotFoundError extends HttpException {
  constructor(message = "Resource not found") {
    super(message, HttpStatus.NOT_FOUND);
  }
}
