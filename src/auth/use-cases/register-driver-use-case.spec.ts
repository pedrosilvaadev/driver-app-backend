import { InMemoryDriversRepository } from "src/repositories/in-memory/in-memory-drivers-repository";
import { RegisterDriverUseCase } from "./register-driver-use-case";
import * as bcrypt from 'bcrypt';
import { DriverAlreadyExistsError } from "src/use-cases/errors/driver-already-exists-error";


let useCase: RegisterDriverUseCase
let driversRepository: InMemoryDriversRepository

describe('Register Driver Use Case', () => {
  beforeEach(() => {
    driversRepository = new InMemoryDriversRepository();
    useCase = new RegisterDriverUseCase(driversRepository);
  });

  it('should be able to register a driver', async () => {
    const { driver } = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(driver.id).toEqual(expect.any(Number))
    expect(driver.name).toEqual('John Doe')
    expect(driver.email).toEqual('johndoe@example.com')
  })

  it('should hash the password upon registration', async () => {
    const { driver } = await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare('123456', driver.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should throw error if driver already exists', async () => {
    await useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(useCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }))
      .rejects
      .toBeInstanceOf(DriverAlreadyExistsError);
  });
});
