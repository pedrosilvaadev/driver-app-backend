import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { RidesService } from "./rides.service";
import { CreateRideDto } from "./dto/create-ride.dto";
import { UpdateRideDto } from "./dto/update-ride.dto";

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
  update(@Param("id") id: string) {
    return this.ridesService.update(+id);
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateRideDto) {
    return this.ridesService.updateStatus({
      id: +id,
      status: dto.status,
    });
  }
}
