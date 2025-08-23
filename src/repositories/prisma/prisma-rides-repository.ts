import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Ride } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { RidesRepository } from "../rides-repository";

@Injectable()
export class PrismaRidesRepository implements RidesRepository {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.RideCreateInput): Promise<Ride> {
    return this.prisma.ride.create({ data });
  }
  findById(id: number): Promise<Ride | null> {
    return this.prisma.ride.findUnique({ where: { id } });
  }
  update(id: number, data: Prisma.RideUpdateInput): Promise<Ride> {
    return this.prisma.ride.update({
      where: { id },
      data,
    });
  }
  findAllAvailable(): Promise<Ride[]> {
    return this.prisma.ride.findMany({
      where: { status: "available" },
    });
  }
}
