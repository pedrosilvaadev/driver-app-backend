import { AcceptRideUseCase } from "./accept-ride-use-case";
import { InMemoryRidesRepository } from "src/repositories/in-memory/in-memory-rides-repository";
import { FetchRidesAvailableUseCase } from "./fetch-rides-available-use-case";

let useCase: FetchRidesAvailableUseCase;
let ridesRepository: InMemoryRidesRepository;

describe("Fetch Available Ride Use Case", () => {
  beforeEach(() => {
    ridesRepository = new InMemoryRidesRepository();
    useCase = new FetchRidesAvailableUseCase(ridesRepository);
  });

  it("should be accept a ride", async () => {
    for (let i = 0; i < 5; i++) {
      await ridesRepository.create({
        pickup_lat: 10.0 + i,
        pickup_lng: 20.0 + i,
        pickup_address: `123 Main St ${i}`,
        dropoff_lat: 30.0 + i,
        dropoff_lng: 40.0 + i,
        dropoff_address: `456 Elm St ${i}`,
        passenger: { connect: { id: 1 } },
        status: i % 2 === 0 ? "available" : "in_progress",
        driver: { connect: { id: 1 } },
      });
    }

    const { rides } = await useCase.execute();
    expect(rides).toHaveLength(3);
  });
});
