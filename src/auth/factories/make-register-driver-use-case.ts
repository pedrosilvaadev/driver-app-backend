import { PrismaService } from "src/prisma/prisma.service";
import { PrismaDriversRepository } from "src/repositories/prisma/prisma-driver-repository";
import { RegisterDriverUseCase } from "../use-cases/register-driver-use-case";

export function makeRegisterDriverUseCase() {
  const driversRepository = new PrismaDriversRepository(new PrismaService());
  return new RegisterDriverUseCase(driversRepository);
}
