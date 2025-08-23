import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaDriversRepository } from "src/repositories/prisma/prisma-driver-repository";
import { SignInDriverUseCase } from "./use-cases/signin-driver-use-case";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./guard/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET") || "default_secret",
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInDriverUseCase,
    PrismaService,
    JwtStrategy,
    {
      provide: "DriversRepository",
      useClass: PrismaDriversRepository,
    },
  ],
})
export class AuthModule {}
