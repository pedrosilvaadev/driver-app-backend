import { Ride } from "@prisma/client";
import { RidesRepository } from "src/repositories/rides-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";

export class GetRideDetailUseCase {
  constructor(private ridesRepository: RidesRepository) {}

  async execute({ id }: { id: number }): Promise<{ ride: Ride }> {
    const ride = await this.ridesRepository.findById(id);
    if (!ride) {
      throw new ResourceNotFoundError();
    }
    return { ride: ride };
  }
}
