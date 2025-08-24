import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Ride } from "@prisma/client";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class RidesGateway {
  @WebSocketServer()
  server: Server;

  broadcastRideUpdate(ride: Ride) {
    this.server.emit("rideUpdated", {
      type: "rideUpdated",
      ride,
    });
  }

  broadcastRideAccepted(ride: Ride) {
    this.server.emit("rideAccepted", {
      type: "rideAccepted",
      ride,
    });
  }
}
