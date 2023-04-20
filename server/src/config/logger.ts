import morgan from "morgan";
import fs from "fs";
import path from "path";

const logStream = fs.createWriteStream(path.join(__dirname, "../../error.log"), {
  flags: "a",
});

export const logger = morgan("combined", {
  skip: (req, res) => res.statusCode < 400,
  stream: logStream,
});