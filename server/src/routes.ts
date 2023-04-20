import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import { versioning } from "./utils/versioning";
import { errorMiddleware } from "./middlewares/error";
import dotenv from "dotenv";
import Server from './services/server';

dotenv.config();

export default {
  init: () => {
    const apiVersion = process.env.API_VERSION || '1';

    Server.app?.use(`/auth`, authRoutes);
    Server.app?.use(`/api/v${apiVersion}/users`, versioning(apiVersion), userRoutes);
    Server.app?.use(errorMiddleware);

    console.info('Routes loaded ');
  }
}