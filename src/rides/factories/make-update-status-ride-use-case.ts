import { UpdateStatusRideUseCase } from "../use-cases/update-status-ride-use-case";
import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaDriversRepository } from "src/repositories/prisma/prisma-driver-repository";
import { PrismaService } from "src/prisma/prisma.service";

export function makeUpdateStatusRideUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  const driversRepository = new PrismaDriversRepository(new PrismaService());
  return new UpdateStatusRideUseCase(ridesRepository, driversRepository);
}
