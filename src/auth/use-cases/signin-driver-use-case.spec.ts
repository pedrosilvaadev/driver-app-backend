import { InMemoryDriversRepository } from "src/repositories/in-memory/in-memory-drivers-repository";
import * as bcrypt from 'bcrypt';
import { SignInDriverUseCase } from "./signin-driver-use-case";
import { JwtService } from "@nestjs/jwt";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";

let useCase: SignInDriverUseCase
let driversRepository: InMemoryDriversRepository
let jwtService: JwtService

describe('Signin Driver Use Case', () => {
  beforeEach(() => {
    driversRepository = new InMemoryDriversRepository();
    jwtService = new JwtService({ secret: 'secret_key', signOptions: { expiresIn: '1h' } });
    useCase = new SignInDriverUseCase(driversRepository, jwtService);
  });

  it('should be able to authenticate', async () => {
    await driversRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('123456', 10),
      status: 'offline',
      rating: 4.5,
      total_trips: 0,
      current_location: { lat: 0, lng: 0 },
    })
    const { driver, token } = await useCase.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(driver.id).toEqual(expect.any(Number))
    expect(driver.name).toEqual('John Doe')
    expect(driver.email).toEqual('johndoe@example.com')
    expect(token).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(useCase.execute({
      email: 'johndoe@example.com',
      password: '123456'
    }))
      .rejects
      .toBeInstanceOf(InvalidCredentialsError);
  })

  it('should not be able to authenticate with wrong password', async () => {
    await driversRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await bcrypt.hash('123456', 10),
      status: 'offline',
      rating: 4.5,
      total_trips: 0,
      current_location: { lat: 0, lng: 0 },
    })

    await expect(useCase.execute({
      email: 'johndoe@example.com',
      password: '12345'
    }))
      .rejects
      .toBeInstanceOf(InvalidCredentialsError);
  });
});
