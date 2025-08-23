import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaDriversRepository } from "src/repositories/prisma/prisma-driver-repository";
import { SignInDriverUseCase } from "./use-cases/signin-driver-use-case";
import { ConfigModule, ConfigService } from "@nestjs/config";
import type { DriversRepository } from "src/repositories/drivers-repository";

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInDriverUseCase,
    PrismaService,
    JwtService,
    {
      provide: "DriversRepository",
      useClass: PrismaDriversRepository,
    },
  ],
})
export class AuthModule {}
