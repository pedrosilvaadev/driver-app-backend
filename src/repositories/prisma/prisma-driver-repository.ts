import { PrismaService } from "../../prisma/prisma.service";
import { Driver, Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { DriversRepository } from "../drivers-repository";

@Injectable()
export class PrismaDriversRepository implements DriversRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: number): Promise<Driver | null> {
    return this.prisma.driver.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<Driver | null> {
    return this.prisma.driver.findUnique({ where: { email } });
  }

  create(data: Prisma.DriverCreateInput): Promise<Driver> {
    return this.prisma.driver.create({ data });
  }
}
