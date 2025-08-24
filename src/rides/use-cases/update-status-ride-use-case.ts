import { Ride, RideStatus } from "@prisma/client";
import { DriversRepository } from "src/repositories/drivers-repository";
import { RidesRepository } from "src/repositories/rides-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideIsNotInProgressError } from "src/use-cases/errors/ride-is-not-in-progress-error";

export class UpdateStatusRideUseCase {
  constructor(
    private ridesRepository: RidesRepository,
    private driversRepository: DriversRepository
  ) {}

  async execute({
    id,
    status,
    driver_id,
  }: {
    id: number;
    status: RideStatus;
    driver_id: number;
  }): Promise<{ ride: Ride }> {
    const ride = await this.ridesRepository.findById(id);
    if (!ride) {
      throw new ResourceNotFoundError();
    }

    const driver = await this.driversRepository.findById(driver_id);
    if (!driver) {
      throw new ResourceNotFoundError();
    }

    if (ride.driver_id !== driver_id) {
      throw new ResourceNotFoundError();
    }

    const allowedStatuses: RideStatus[] = ["picked_up", "in_progress"];
    if (!allowedStatuses.includes(ride.status)) {
      throw new RideIsNotInProgressError();
    }

    const updatedRide = await this.ridesRepository.update(id, {
      status: status,
    });

    return { ride: updatedRide };
  }
}
