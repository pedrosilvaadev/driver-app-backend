import { RideStatus } from "@prisma/client";
import { IsOptional, IsString, IsUUID, IsEnum } from "class-validator";

export class UpdateRideDto {
  @IsString()
  @IsOptional()
  @IsEnum(RideStatus)
  status: RideStatus;
}
