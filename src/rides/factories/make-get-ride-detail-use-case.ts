import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaService } from "src/prisma/prisma.service";
import { GetRideDetailUseCase } from "../use-cases/get-ride-detail-use-case";

export function makeGetRideDetailUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  return new GetRideDetailUseCase(ridesRepository);
}
