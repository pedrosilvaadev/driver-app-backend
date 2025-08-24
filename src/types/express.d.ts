import { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: {
      driverId: payload.sub;
      email: payload.email;
    };
  }
}
