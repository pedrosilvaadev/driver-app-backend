import { Ride } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";
import { CreateRideDto } from "../dto/create-ride.dto";

export class RequestRideUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute(input: CreateRideDto): Promise<{ ride: Ride }> {
    const ride = await this.ridesRepository.create({
      pickup_lat: input.pickup_lat,
      pickup_lng: input.pickup_lng,
      pickup_address: input.pickup_address,
      dropoff_lat: input.dropoff_lat,
      dropoff_lng: input.dropoff_lng,
      dropoff_address: input.dropoff_address,
      passenger: { connect: { id: input.passenger_id } },
      status: input.status,
      driver: input.driver_id
        ? { connect: { id: input.driver_id } }
        : undefined,
    });
    return { ride };
  }
}
