"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
class ServerNet {
    constructor(app) {
        console.info('[Lib] Server: Creating http server');
        this.cio = http_1.default.createServer(app).listen(port, this.initialize.bind(this));
    }
    initialize() {
        console.info(`Server lib Started at port: ${port}`);
    }
}
exports.default = ServerNet;
;
//# sourceMappingURL=server.js.map