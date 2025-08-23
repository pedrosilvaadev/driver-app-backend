import { Ride } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideNotAvailableError } from "src/use-cases/errors/ride-not-available-error";

export class AcceptRideUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({ id }: { id: number }): Promise<{ ride: Ride }> {
    const ride = await this.ridesRepository.findById(id);
    if (!ride) {
      throw new ResourceNotFoundError();
    }

    if (ride.status !== "available") {
      throw new RideNotAvailableError();
    }

    const updatedRide = await this.ridesRepository.update(id, {
      status: "in_progress",
    });

    return { ride: updatedRide };
  }
}
