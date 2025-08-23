import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { AuthModule } from "./auth.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

describe("AuthController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.driver.deleteMany();
  });

  afterAll(async () => {
    await prisma.driver.deleteMany();

    await app.close();
  });

  it("/auth/signup (POST) should register a driver", async () => {
    const res = await request(app.getHttpServer()).post("/auth/signup").send({
      name: "Test Driver",
      email: "testdriver@example.com",
      password: "test1234",
    });
    expect(res.status).toBe(201);
    const { driver } = res.body;
    expect(driver).toHaveProperty("id");
    expect(driver).toHaveProperty("email", "testdriver@example.com");
  });

  it("/auth/login (POST) should return a JWT", async () => {
    await request(app.getHttpServer()).post("/auth/signup").send({
      name: "Test Driver2",
      email: "testdriver2@example.com",
      password: "test1234",
    });

    const res = await request(app.getHttpServer()).post("/auth/login").send({
      email: "testdriver2@example.com",
      password: "test1234",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("access_token");
  });
});
