import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { RidesModule } from "./rides.module";
import { AuthModule } from "../auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

const seedData = async (prisma: PrismaService) => {
  await prisma.ride.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.passenger.deleteMany();

  const passenger1 = await prisma.passenger.create({
    data: { name: "Alice" },
  });
  const passenger2 = await prisma.passenger.create({ data: { name: "Bob" } });

  await prisma.ride.createMany({
    data: [
      {
        id: 1,
        passenger_id: passenger1.id,
        status: "available",
        pickup_lat: -23.55052,
        pickup_lng: -46.633308,
        pickup_address: "Av. Paulista, 1000",
        dropoff_lat: -23.559616,
        dropoff_lng: -46.658722,
        dropoff_address: "Rua Oscar Freire, 200",
      },
      {
        id: 2,
        passenger_id: passenger2.id,
        status: "available",
        pickup_lat: -23.561684,
        pickup_lng: -46.625378,
        pickup_address: "Rua Augusta, 150",
        dropoff_lat: -23.570703,
        dropoff_lng: -46.641468,
        dropoff_address: "Praça da República, 50",
      },
      {
        id: 3,
        passenger_id: passenger2.id,
        status: "in_progress",
        pickup_lat: -23.561684,
        pickup_lng: -46.625378,
        pickup_address: "Rua Augusta, 150",
        dropoff_lat: -23.570703,
        dropoff_lng: -46.641468,
        dropoff_address: "Praça da República, 50",
      },
      {
        id: 4,
        passenger_id: passenger2.id,
        status: "in_progress",
        pickup_lat: -23.561684,
        pickup_lng: -46.625378,
        pickup_address: "Rua Augusta, 150",
        dropoff_lat: -23.570703,
        dropoff_lng: -46.641468,
        dropoff_address: "Praça da República, 50",
      },
    ],
  });
};

describe("RidesController (e2e)", () => {
  let app: INestApplication;
  let jwt: string;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RidesModule,
        AuthModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);

    await request(app.getHttpServer()).post("/auth/signup").send({
      name: "Driver Test",
      email: "driver@test.com",
      password: "test1234",
    });

    const res = await request(app.getHttpServer()).post("/auth/login").send({
      email: "driver@test.com",
      password: "test1234",
    });

    jwt = res.body.access_token;
  });

  beforeEach(async () => {
    await seedData(prisma);
  });

  afterAll(async () => {
    await app.close();
  });

  it("/rides (GET) should return all rides available (autenticado)", async () => {
    const res = await request(app.getHttpServer())
      .get("/rides")
      .set("Authorization", `Bearer ${jwt}`);
    expect(res.status).toBe(200);
    const { rides } = res.body;
    expect(Array.isArray(rides)).toBe(true);
  });

  it("/rides (GET) should return 401 if not authenticated", async () => {
    const res = await request(app.getHttpServer()).get("/rides");
    expect(res.status).toBe(401);
  });

  it("/rides/:id (GET) should return ride details", async () => {
    const res = await request(app.getHttpServer())
      .get("/rides/1")
      .set("Authorization", `Bearer ${jwt}`);
    expect(res.status).toBe(200);
    const { ride } = res.body;
    expect(ride).toHaveProperty("id", 1);
    expect(ride).toHaveProperty("status");
  });

  it("/rides/:id/accept (PATCH) should accept a ride", async () => {
    const res = await request(app.getHttpServer())
      .patch("/rides/1/accept")
      .set("Authorization", `Bearer ${jwt}`);
    expect(res.status).toBe(200);
    const { ride } = res.body;
    expect(ride).toHaveProperty("id", 1);
    expect(ride).toHaveProperty("status", "in_progress");
  });

  it("/rides/:id/accept (PATCH) should return resource not found", async () => {
    const res = await request(app.getHttpServer())
      .patch("/rides/999/accept")
      .set("Authorization", `Bearer ${jwt}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resource not found");
  });

  it("/rides/:id/accept (PATCH) should return ride not available", async () => {
    const res = await request(app.getHttpServer())
      .patch("/rides/3/accept")
      .set("Authorization", `Bearer ${jwt}`);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Ride is not available");
  });

  it("/rides/:id/status (PUT) should update ride status picked_up", async () => {
    const res = await request(app.getHttpServer())
      .put("/rides/3/status")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ status: "picked_up" });
    expect(res.status).toBe(200);
    const { ride } = res.body;
    expect(ride).toHaveProperty("id", 3);
    expect(ride).toHaveProperty("status", "picked_up");
  });

  it("/rides/:id/status (PUT) should update ride status dropped_off", async () => {
    const res = await request(app.getHttpServer())
      .put("/rides/4/status")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ status: "dropped_off" });
    expect(res.status).toBe(200);
    const { ride } = res.body;
    expect(ride).toHaveProperty("id", 4);
    expect(ride).toHaveProperty("status", "dropped_off");
  });

  it("/rides/:id/status (PUT) should return ride is not found", async () => {
    const res = await request(app.getHttpServer())
      .put("/rides/999/status")
      .set("Authorization", `Bearer ${jwt}`)
      .send({ status: "picked_up" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Resource not found");
  });
});
