import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { RidesService } from "./rides.service";
import { UpdateRideDto } from "./dto/update-ride.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import type { Request } from "express";

@UseGuards(JwtAuthGuard)
@Controller("rides")
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Get()
  findAll() {
    return this.ridesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ridesService.findOne(+id);
  }

  @Patch(":id/accept")
  update(@Param("id") id: string, @Req() req: Request) {
    const driverId = req.user?.driverId;
    return this.ridesService.update(+id, driverId!);
  }

  @Put(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() dto: UpdateRideDto,
    @Req() req: Request
  ) {
    const driverId = req.user?.driverId;
    return this.ridesService.updateStatus({
      id: +id,
      status: dto.status,
      driver_id: driverId!,
    });
  }
}
