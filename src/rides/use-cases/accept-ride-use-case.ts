import { Ride } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";
import { DriversRepository } from "src/repositories/drivers-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideNotAvailableError } from "src/use-cases/errors/ride-not-available-error";

export class AcceptRideUseCase {
  constructor(
    private ridesRepository: RidesRepository,
    private driversRepository: DriversRepository
  ) {}

  async execute({
    id,
    driver_id,
  }: {
    id: number;
    driver_id: number;
  }): Promise<{ ride: Ride }> {
    const driver = await this.driversRepository.findById(driver_id);

    if (!driver) {
      throw new ResourceNotFoundError();
    }

    const ride = await this.ridesRepository.findById(id);

    if (!ride) {
      throw new ResourceNotFoundError();
    }

    if (ride.status !== "available") {
      throw new RideNotAvailableError();
    }

    const updatedRide = await this.ridesRepository.update(id, {
      status: "in_progress",
      driver_id,
    });

    return { ride: updatedRide };
  }
}
