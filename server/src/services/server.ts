import helmet from "helmet";
import cors from "cors";
import { logger } from "../config/logger";
import ServerNet from "../lib/server";
import { IServer } from "../utils/interfaces";
import express, { Request, Response, NextFunction } from "express";

const Server: IServer = {

  init () {
    this.app = express();
    this.server  = new ServerNet(this.app); // Start server

    // addons
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(logger);
    this.app.use(express.json());

    // Log activity
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      let remoteAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      console.info({
        message: {
          description: 'Middleware Incomming request',
          data       : `remoteAddress:${remoteAddress} method:${req.method} url:${req.url}`
        }
      });
      return next();
    });

    return this;
  }
}

export default Server;