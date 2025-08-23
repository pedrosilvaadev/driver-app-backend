import { Injectable } from "@nestjs/common";
import { makeFetchRidesAvailableUseCase } from "./factories/make-fetch-rides-available-use-case";
import { makeGetRideDetailUseCase } from "./factories/make-get-ride-detail-use-case";
import { makeAcceptRideUseCase } from "./factories/make-accept-ride-use-case";
import { makeUpdateStatusRideUseCase } from "./factories/make-update-status-ride-use-case";
import { RideStatus } from "@prisma/client";

@Injectable()
export class RidesService {
  findAll() {
    const ridesUseCase = makeFetchRidesAvailableUseCase();
    return ridesUseCase.execute();
  }

  findOne(id: number) {
    const ridesUseCase = makeGetRideDetailUseCase();
    return ridesUseCase.execute({ id });
  }

  update(id: number) {
    const ridesUseCase = makeAcceptRideUseCase();
    return ridesUseCase.execute({ id });
  }

  updateStatus({ id, status }: { id: number; status: RideStatus }) {
    const ridesUseCase = makeUpdateStatusRideUseCase();
    return ridesUseCase.execute({ id, status });
  }
}
