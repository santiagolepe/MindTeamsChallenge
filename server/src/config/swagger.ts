import m2s from "mongoose-to-swagger";

// get all schemas from mongoose
import User from "../models/user";
import Account from "../models/account";
import Transfer from "../models/transfer";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "MIND Team API",
    description: "MIND Team Challenge",
    contact: {
      name: "Octavio Santiago",
      url: "https://github.com/santiagolepe/MindTeamsChallenge",
      email: "santiagolepe@gmail.com"
    }
  },
  components: {
    schemas: {
      User: m2s(User),
      Account: m2s(Account),
      Transfer: m2s(Transfer),
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      },
    },
    security: {
      BearerAuth: []
    }
  }
};

export default swaggerDefinition;