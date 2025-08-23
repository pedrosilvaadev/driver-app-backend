import { Ride, RideStatus } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideIsNotInProgressError } from "src/use-cases/errors/ride-is-not-in-progress-error";

export class UpdateStatusRideUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({
    id,
    status,
  }: {
    id: number;
    status: RideStatus;
  }): Promise<{ ride: Ride }> {
    const ride = await this.ridesRepository.findById(id);
    if (!ride) {
      throw new ResourceNotFoundError();
    }

    if (ride.status !== "in_progress") {
      throw new RideIsNotInProgressError();
    }

    const updatedRide = await this.ridesRepository.update(id, {
      status: status,
    });

    return { ride: updatedRide };
  }
}
