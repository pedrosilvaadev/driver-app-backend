import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const passenger1 = await prisma.passenger.create({
    data: { name: "Alice" },
  });
  const passenger2 = await prisma.passenger.create({
    data: { name: "Bob" },
  });
  const passenger3 = await prisma.passenger.create({
    data: { name: "John" },
  });

  const passenger4 = await prisma.passenger.create({
    data: { name: "Jane" },
  });

  const passenger5 = await prisma.passenger.create({
    data: { name: "Mike" },
  });

  await prisma.ride.createMany({
    data: [
      {
        passenger_id: passenger1.id,
        pickup_lat: -23.5,
        pickup_lng: -46.6,
        pickup_address: "Av. Paulista, 1000",
        dropoff_lat: -23.6,
        dropoff_lng: -46.7,
        dropoff_address: "Rua Augusta, 200",
      },
      {
        passenger_id: passenger2.id,
        pickup_lat: -23.55,
        pickup_lng: -46.65,
        pickup_address: "Praça da Sé, 50",
        dropoff_lat: -23.57,
        dropoff_lng: -46.68,
        dropoff_address: "Av. Brigadeiro, 500",
      },

      {
        passenger_id: passenger3.id,
        pickup_lat: -23.58,
        pickup_lng: -46.62,
        pickup_address: "Av. Ipiranga, 300",
        dropoff_lat: -23.59,
        dropoff_lng: -46.63,
        dropoff_address: "Rua da Consolação, 400",
      },
      {
        passenger_id: passenger4.id,
        pickup_lat: -23.52,
        pickup_lng: -46.61,
        pickup_address: "Av. Faria Lima, 600",
        dropoff_lat: -23.53,
        dropoff_lng: -46.64,
        dropoff_address: "Rua Oscar Freire, 700",
      },
      {
        passenger_id: passenger5.id,
        pickup_lat: -23.54,
        pickup_lng: -46.66,
        pickup_address: "Av. Rebouças, 800",
        dropoff_lat: -23.56,
        dropoff_lng: -46.69,
        dropoff_address: "Rua Haddock Lobo, 900",
      },
    ],
  });

  console.log("Seed data created");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
