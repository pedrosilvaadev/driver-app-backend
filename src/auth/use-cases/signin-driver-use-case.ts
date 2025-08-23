import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import type { DriversRepository } from "src/repositories/drivers-repository";
import { InvalidCredentialsError } from "src/use-cases/errors/invalid-credentials-error";

@Injectable()
export class SignInDriverUseCase {
  constructor(
    @Inject("DriversRepository")
    private driversRepository: DriversRepository,
    private jwtService: JwtService
  ) {}

  async execute({ email, password }: { email: string; password: string }) {
    const driver = await this.driversRepository.findByEmail(email);
    if (!driver) throw new InvalidCredentialsError();

    const isValid = await bcrypt.compare(password, driver.password);
    if (!isValid) throw new InvalidCredentialsError();

    const token = this.jwtService.sign({
      userId: driver.id,
      email: driver.email,
    });
    return { driver, token };
  }
}
