import { AcceptRideUseCase } from "./accept-ride-use-case";
import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { InMemoryDriversRepository } from "src/repositories/in-memory/in-memory-drivers-repository";
import { ResourceNotFoundError } from "src/use-cases/errors/resource-not-found-error";
import { RideNotAvailableError } from "src/use-cases/errors/ride-not-available-error";

describe("AcceptRideUseCase", () => {
  let ridesRepository: InMemoryRidesRepository;
  let driversRepository: InMemoryDriversRepository;
  let useCase: AcceptRideUseCase;
  let driver;

  beforeEach(async () => {
    ridesRepository = new InMemoryRidesRepository();
    driversRepository = new InMemoryDriversRepository();
    useCase = new AcceptRideUseCase(ridesRepository, driversRepository);

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
      driver: { connect: { id: driver.id } },
    });

    const { ride: acceptedRide } = await useCase.execute({
      id: ride.id,
      driver_id: driver.id,
    });

    expect(acceptedRide.status).toEqual("in_progress");
  });

  it("should not be able to accept a ride that does not exist", async () => {
    await expect(() =>
      useCase.execute({ id: 999, driver_id: driver.id })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
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
      driver: { connect: { id: driver.id } },
    });

    await expect(() =>
      useCase.execute({ id: ride.id, driver_id: driver.id })
    ).rejects.toBeInstanceOf(RideNotAvailableError);
  });

  it("should throw if driver does not exist", async () => {
    await expect(
      useCase.execute({ id: 1, driver_id: 999 })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
