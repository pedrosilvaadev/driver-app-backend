import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { AcceptRideUseCase } from "./accept-ride-use-case";
import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { RideNotAvailableError } from "src/use-cases/errors/ride-not-available-error";

let useCase: AcceptRideUseCase;
let ridesRepository: InMemoryRidesRepository;

describe("Accept Ride Use Case", () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository();
    useCase = new AcceptRideUseCase(ridesRepository);
  });

  it("should be accept a ride", async () => {
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

    const { ride: acceptedRide } = await useCase.execute({ id: ride.id });
    expect(acceptedRide.status).toEqual("in_progress");
  });

  it("should not be able to accept a ride that does not exist", async () => {
    await expect(() => useCase.execute({ id: 999 })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it("should not be able to accept a ride that is not available", async () => {
    const ride = await ridesRepository.create({
      pickup_lat: 10.0,
      pickup_lng: 20.0,
      pickup_address: "123 Main St",
      dropoff_lat: 30.0,
      dropoff_lng: 40.0,
      dropoff_address: "456 Elm St",
      passenger: { connect: { id: 1 } },
      status: "in_progress",
      driver: { connect: { id: 1 } },
    });

    await expect(() => useCase.execute({ id: ride.id })).rejects.toBeInstanceOf(
      RideNotAvailableError
    );
  });
});
