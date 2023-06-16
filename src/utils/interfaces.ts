import { Request } from "express";
import { Express } from 'express-serve-static-core';
import ServerNet from "../lib/server";

// create an intefrace that extends of Request
export interface IUserAuthRequest extends Request {
  userId?: string;
  role?  : string;
}

export interface IServer {
  app?   : Express;
  server?: ServerNet;
  init   : () => void;
}