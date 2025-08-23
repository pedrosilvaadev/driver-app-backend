import { RequestRideUseCase } from "../use-cases/request-ride-use-case";
import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaService } from "src/prisma/prisma.service";

export function makeRequestRideUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  return new RequestRideUseCase(ridesRepository);
}
