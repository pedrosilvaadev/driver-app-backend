import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { GetRideDetailUseCase } from "./get-ride-detail-use-case";
import e from "express";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";

let useCase: GetRideDetailUseCase;
let ridesRepository: InMemoryRidesRepository;

describe("Get Ride Detail Use Case", () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository();
    useCase = new GetRideDetailUseCase(ridesRepository);
  });

  it("should be get a ride detail", async () => {
    const ride = await ridesRepository.create({
      pickup_lat: 10.0,
      pickup_lng: 20.0,
      pickup_address: "123 Main St",
      dropoff_lat: 30.0,
      dropoff_lng: 40.0,
      dropoff_address: "456 Elm St",
      passenger: { connect: { id: 1 } },
      status: "available",
      driver: { connect: { id: 1 } },
    });

    const { ride: rideDetail } = await useCase.execute({ id: ride.id });
    expect(rideDetail.id).toEqual(ride.id);
    expect(rideDetail.status).toEqual("available");
    expect(rideDetail.pickup_address).toEqual("123 Main St");
    expect(rideDetail.dropoff_address).toEqual("456 Elm St");
  });

  it("should not be able to get a ride that does not exist", async () => {
    await expect(() => useCase.execute({ id: 999 })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
