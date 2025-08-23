import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import type { DriversRepository } from "src/repositories/drivers-repository";
import { DriverAlreadyExistsError } from "src/use-cases/errors/driver-already-exists-error";

@Injectable()
export class RegisterDriverUseCase {
  constructor(private driversRepository: DriversRepository) {}

  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const existingDriver = await this.driversRepository.findByEmail(email);
      if (existingDriver) throw new DriverAlreadyExistsError();

      const hashedPassword = await bcrypt.hash(password, 10);

      const driver = await this.driversRepository.create({
        name,
        email,
        password: hashedPassword,
        status: "offline",
        rating: 4.5,
        total_trips: 0,
        current_location: { lat: 0, lng: 0 },
      });

      return {
        driver,
      };
    } catch (error) {
      throw error;
    }
  }
}
