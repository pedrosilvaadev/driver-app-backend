import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateStatusRideUseCase } from "../use-cases/update-status-ride-use-case";

export function makeUpdateStatusRideUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  return new UpdateStatusRideUseCase(ridesRepository);
}
