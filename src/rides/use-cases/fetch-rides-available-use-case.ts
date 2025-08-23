import { Ride } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";

export class FetchRidesAvailableUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute(): Promise<{ rides: Ride[] }> {
    const availableRides = await this.ridesRepository.findAllAvailable();
    return { rides: availableRides };
  }
}
