import { Ride, Prisma } from "@prisma/client";

export interface RidesRepository {
  create(data: Prisma.RideCreateInput): Promise<Ride>;
  findById(id: number): Promise<Ride | null>;
  update(id: number, data: Partial<Ride>): Promise<Ride>;
  findAllAvailable(): Promise<Ride[]>;
}
