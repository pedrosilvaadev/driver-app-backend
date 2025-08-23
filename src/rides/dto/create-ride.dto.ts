import { RideStatus } from "@prisma/client";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from "class-validator";

export class CreateRideDto {
  @IsOptional()
  @IsInt()
  driver_id?: number | null;

  @IsInt()
  passenger_id: number;

  @IsEnum(RideStatus)
  status: RideStatus;

  @IsNumber()
  pickup_lat: number;

  @IsNumber()
  pickup_lng: number;

  @IsString()
  @IsNotEmpty()
  pickup_address: string;

  @IsNumber()
  dropoff_lat: number;

  @IsNumber()
  dropoff_lng: number;

  @IsString()
  @IsNotEmpty()
  dropoff_address: string;
}
