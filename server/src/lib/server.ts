/**
 * This class is in charge of creating the (http/https) Server
 *
 *
 * { Configuration }
 *
 *  SSL    @type {Object}
 *
 *    ENABLED      @type {Boolean}
 *    PORT         @type {Number}
 *    CREDENTIALS  @type {Object}
 *
 *  PORT     @type {Number}
 *
 *
 * Creating a new Server instance
 *
 *                          Server
 *                         [       ] --Read --> [ {Configuration} ]
 *   {Object} <- Return -- [       ]            [                 ]
 *                         [       ] <--------- [                 ]
 *
 * Starting the server
 *
 *                           Server
 *                         [  Start ] -- If SSL ON  --> Create HTPPS Server
 *   {Server} <- Return -- [        ]
 *                         [  Start ] -- If SSL OFF --> Create HTPP  Server
 *
*/
import http from 'http';
import { Express } from "express";
import dotenv from "dotenv";
import { Server } from 'net';

dotenv.config();
const port = process.env.PORT || 3000;

export default class ServerNet {
  
  cio: Server;

  constructor (app: Express) {

    console.info('[Lib] Server: Creating http server');
    this.cio = http.createServer(app).listen(port, this.initialize.bind(this));
  }
  
  initialize () {
    console.info(`Server lib Started at port: ${port}`);
  }
};
