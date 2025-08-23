import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { UpdateStatusRideUseCase } from "./update-status-ride-use-case";
import { RideIsNotInProgressError } from "src/use-cases/errors/ride-is-not-in-progress-error";

let useCase: UpdateStatusRideUseCase;
let ridesRepository: InMemoryRidesRepository;

describe("Update Status Ride Use Case", () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository();
    useCase = new UpdateStatusRideUseCase(ridesRepository);
  });

  it("should be update status a ride to picked up", async () => {
    const createdRide = await ridesRepository.create({
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

    const { ride } = await useCase.execute({
      id: createdRide.id,
      status: "picked_up",
    });
    expect(ride.status).toEqual("picked_up");
  });

  it("should be update status a ride to dropped off", async () => {
    const createdRide = await ridesRepository.create({
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

    const { ride } = await useCase.execute({
      id: createdRide.id,
      status: "dropped_off",
    });
    expect(ride.status).toEqual("dropped_off");
  });

  it("should not be able to update status a ride that does not exist", async () => {
    await expect(() =>
      useCase.execute({ id: 999, status: "picked_up" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to update status a ride that is not in progress", async () => {
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

    await expect(() =>
      useCase.execute({ id: ride.id, status: "picked_up" })
    ).rejects.toBeInstanceOf(RideIsNotInProgressError);
  });
});
