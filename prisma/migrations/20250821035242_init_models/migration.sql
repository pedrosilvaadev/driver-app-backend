-- CreateEnum
CREATE TYPE "public"."DriverStatus" AS ENUM ('online', 'offline', 'on_trip');

-- CreateEnum
CREATE TYPE "public"."RideStatus" AS ENUM ('available', 'in_progress', 'picked_up', 'dropped_off');

-- CreateTable
CREATE TABLE "public"."drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "current_location" JSONB NOT NULL,
    "status" "public"."DriverStatus" NOT NULL DEFAULT 'offline',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    "total_trips" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."passengers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rides" (
    "id" SERIAL NOT NULL,
    "driver_id" INTEGER,
    "passenger_id" INTEGER NOT NULL,
    "status" "public"."RideStatus" NOT NULL DEFAULT 'available',
    "pickup_lat" DOUBLE PRECISION NOT NULL,
    "pickup_lng" DOUBLE PRECISION NOT NULL,
    "pickup_address" TEXT NOT NULL,
    "dropoff_lat" DOUBLE PRECISION NOT NULL,
    "dropoff_lng" DOUBLE PRECISION NOT NULL,
    "dropoff_address" TEXT NOT NULL,

    CONSTRAINT "rides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_email_key" ON "public"."drivers"("email");

-- AddForeignKey
ALTER TABLE "public"."rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rides" ADD CONSTRAINT "rides_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "public"."passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
