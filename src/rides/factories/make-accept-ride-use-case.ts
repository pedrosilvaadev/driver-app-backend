import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { AcceptRideUseCase } from "../use-cases/accept-ride-use-case";
import { PrismaDriversRepository } from "src/repositories/prisma/prisma-driver-repository";
import { PrismaService } from "src/prisma/prisma.service";

export function makeAcceptRideUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  const driversRepository = new PrismaDriversRepository(new PrismaService());
  return new AcceptRideUseCase(ridesRepository, driversRepository);
}
