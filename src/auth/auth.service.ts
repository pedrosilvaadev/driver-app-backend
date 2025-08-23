import { Injectable } from "@nestjs/common";
import { makeRegisterDriverUseCase } from "./factories/make-register-driver-use-case";
import { makeSignInDriverUseCase } from "./factories/make-signin-driver-use-case";
import { RegisterDriverDto } from "./dto/register-driver.dto";
import { SignInDriverDto } from "./dto/signin-driver.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  signup(dto: RegisterDriverDto) {
    const registerUseCase = makeRegisterDriverUseCase();
    return registerUseCase.execute(dto);
  }

  signin(dto: SignInDriverDto) {
    const signInUseCase = makeSignInDriverUseCase(this.configService);
    return signInUseCase.execute(dto);
  }
}
