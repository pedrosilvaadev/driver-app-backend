import { Driver, Prisma } from "@prisma/client";

export interface DriversRepository {
  findById(id: number): Promise<Driver | null>;
  findByEmail(email: string): Promise<Driver | null>;
  create(data: Prisma.DriverCreateInput): Promise<Driver>;
}
