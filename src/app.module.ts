// src/app.module.ts

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { RidesModule } from "./rides/rides.module";
import { RidesController } from "./rides/rides.controller";
import { RidesService } from "./rides/rides.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    RidesModule,
  ],
  controllers: [AppController, RidesController],
  providers: [AppService, PrismaService, RidesService],
})
export class AppModule {}
