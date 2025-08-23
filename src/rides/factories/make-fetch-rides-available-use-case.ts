import { PrismaRidesRepository } from "src/repositories/prisma/prisma-rides-repository";
import { PrismaService } from "src/prisma/prisma.service";
import { FetchRidesAvailableUseCase } from "../use-cases/fetch-rides-available-use-case";

export function makeFetchRidesAvailableUseCase() {
  const ridesRepository = new PrismaRidesRepository(new PrismaService());
  return new FetchRidesAvailableUseCase(ridesRepository);
}
