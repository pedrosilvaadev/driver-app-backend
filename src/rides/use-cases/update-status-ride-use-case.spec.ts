import { UpdateStatusRideUseCase } from "./update-status-ride-use-case";
import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { InMemoryDriversRepository } from "src/repositories/in-memory/in-memory-drivers-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideIsNotInProgressError } from "src/use-cases/errors/ride-is-not-in-progress-error";

describe("UpdateStatusRideUseCase", () => {
  let ridesRepository: InMemoryRidesRepository;
  let driversRepository: InMemoryDriversRepository;
  let useCase: UpdateStatusRideUseCase;
  let driver;

  beforeEach(async () => {
    ridesRepository = new InMemoryRidesRepository();
    driversRepository = new InMemoryDriversRepository();
    useCase = new UpdateStatusRideUseCase(ridesRepository, driversRepository);

    driver = await driversRepository.create({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
      status: "online",
      rating: 4.5,
      total_trips: 0,
      current_location: { lat: 0, lng: 0 },
    });
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
      driver: { connect: { id: driver.id } },
    });

    const { ride } = await useCase.execute({
      id: createdRide.id,
      status: "picked_up",
      driver_id: driver.id,
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
      driver: { connect: { id: driver.id } },
    });

    const { ride } = await useCase.execute({
      id: createdRide.id,
      status: "dropped_off",
      driver_id: driver.id,
    });
    expect(ride.status).toEqual("dropped_off");
  });

  it("should not be able to update status a ride that does not exist", async () => {
    await expect(() =>
      useCase.execute({ id: 999, status: "picked_up", driver_id: driver.id })
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
      driver: { connect: { id: driver.id } },
    });

    await expect(() =>
      useCase.execute({
        id: ride.id,
        status: "picked_up",
        driver_id: driver.id,
      })
    ).rejects.toBeInstanceOf(RideIsNotInProgressError);
  });

  it("should throw if driver does not exist", async () => {
    await expect(
      useCase.execute({ id: 1, status: "picked_up", driver_id: 999 })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
