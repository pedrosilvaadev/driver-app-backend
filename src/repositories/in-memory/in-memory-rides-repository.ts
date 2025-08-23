import { Prisma, Ride } from "@prisma/client";
import { randomInt } from "node:crypto";
import { RidesRepository } from "../rides-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";

export class InMemoryRidesRepository implements RidesRepository {
  public items: Ride[] = [];

  async create(data: Prisma.RideCreateInput): Promise<Ride> {
    const ride: Ride = {
      id: randomInt(1, 1000000),
      pickup_lat: data.pickup_lat,
      pickup_lng: data.pickup_lng,
      pickup_address: data.pickup_address,
      dropoff_lat: data.dropoff_lat,
      dropoff_lng: data.dropoff_lng,
      dropoff_address: data.dropoff_address,
      driver_id: (data.driver as any)?.connect?.id ?? null,
      passenger_id: (data.passenger as any)?.connect?.id,
      status: data.status ?? "available",
    };

    this.items.push(ride);

    return ride;
  }

  async findById(id: number): Promise<Ride | null> {
    const ride = this.items.find((item) => item.id === id);
    return ride ?? null;
  }

  async update(id: number, data: Partial<Ride>): Promise<Ride> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new ResourceNotFoundError();
    }

    const updatedRide: Ride = {
      ...this.items[index],
      ...data,
    };

    this.items[index] = updatedRide;

    return updatedRide;
  }

  async findAllAvailable(): Promise<Ride[]> {
    return this.items.filter((ride) => ride.status === "available");
  }
}
