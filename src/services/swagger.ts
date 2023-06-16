import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import Server from '../services/server';
import swaggerDefinition from "../config/swagger";

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // all routes with them JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);

export default {
  init () {
    Server.app?.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}
