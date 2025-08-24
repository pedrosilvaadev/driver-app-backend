import { Injectable } from "@nestjs/common";
import { makeFetchRidesAvailableUseCase } from "./factories/make-fetch-rides-available-use-case";
import { makeGetRideDetailUseCase } from "./factories/make-get-ride-detail-use-case";
import { makeAcceptRideUseCase } from "./factories/make-accept-ride-use-case";
import { makeUpdateStatusRideUseCase } from "./factories/make-update-status-ride-use-case";
import { RideStatus } from "@prisma/client";
import { RidesGateway } from "./rides.gateway";

@Injectable()
export class RidesService {
  constructor(private readonly ridesGateway: RidesGateway) {}

  findAll() {
    const ridesUseCase = makeFetchRidesAvailableUseCase();
    return ridesUseCase.execute();
  }

  findOne(id: number) {
    const ridesUseCase = makeGetRideDetailUseCase();
    return ridesUseCase.execute({ id });
  }

  async update(id: number, driver_id: number) {
    const ridesUseCase = makeAcceptRideUseCase();
    const { ride } = await ridesUseCase.execute({ id, driver_id });
    this.ridesGateway.broadcastRideAccepted(ride);
    return { ride };
  }

  async updateStatus({
    id,
    status,
    driver_id,
  }: {
    id: number;
    status: RideStatus;
    driver_id: number;
  }) {
    const ridesUseCase = makeUpdateStatusRideUseCase();
    const { ride } = await ridesUseCase.execute({ id, status, driver_id });
    this.ridesGateway.broadcastRideUpdate(ride);
    return { ride };
  }
}
