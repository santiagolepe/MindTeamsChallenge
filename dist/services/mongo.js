"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    init: async () => {
        try {
            let uri = process.env.MONGO_URI;
            await mongoose_1.default.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            });
            console.log("MongoDB connected uri: " + uri);
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        }
    }
};
//# sourceMappingURL=mongo.js.map