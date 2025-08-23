import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { RequestRideUseCase } from "./request-ride-use-case";

let useCase: RequestRideUseCase;
let ridesRepository: InMemoryRidesRepository;

describe("Request Ride Use Case", () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository();
    useCase = new RequestRideUseCase(ridesRepository);
  });

  it("should be request a new ride", async () => {
    const createdRide = await useCase.execute({
      pickup_lat: 10.0,
      pickup_lng: 20.0,
      pickup_address: "123 Main St",
      dropoff_lat: 30.0,
      dropoff_lng: 40.0,
      dropoff_address: "456 Elm St",
      passenger_id: 1,
      status: "available",
      driver_id: 1,
    });

    expect(createdRide.ride).toHaveProperty("id");
    expect(createdRide.ride.pickup_address).toEqual("123 Main St");
    expect(createdRide.ride.dropoff_address).toEqual("456 Elm St");
    expect(createdRide.ride.status).toEqual("available");
    expect(createdRide.ride.passenger_id).toEqual(1);
    expect(createdRide.ride.driver_id).toEqual(1);
    expect(ridesRepository.items).toHaveLength(1);
  });
});
