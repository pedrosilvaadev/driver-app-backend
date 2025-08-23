import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaService } from "src/prisma/prisma.service";
import { AcceptRideUseCase } from "../use-cases/accept-ride-use-case";

export function makeAcceptRideUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  return new AcceptRideUseCase(ridesRepository);
}
