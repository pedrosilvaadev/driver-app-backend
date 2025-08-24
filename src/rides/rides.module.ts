import { Module } from "@nestjs/common";
import { RidesService } from "./rides.service";
import { RidesController } from "./rides.controller";
import { RidesGateway } from "./rides.gateway";

@Module({
  providers: [RidesService, RidesGateway],
  controllers: [RidesController],
  exports: [RidesService, RidesGateway],
})
export class RidesModule {}
