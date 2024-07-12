import { createLogger, format, transports, addColors } from "winston";
import argsUtil from "./args.util.js";

const env = argsUtil.env;

const { colorize, simple } = format;
const { Console, File } = transports;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "white" };
addColors(colors);

let logger = {}
//si el ambiente es producción se consologuean los mensajes desde HTTP
//y se guardan en errors.log a partir del nivel ERROR sin color. 
if (env == "prod") {
   logger = createLogger({
    levels,
    format: colorize(),
    transports: [
      new Console({ level: "HTTP", format: simple() }),
      new File({
        level: "ERROR",
        format: simple(),
        filename: "./src/utils/errors/errors.log",
      }),
    ],
  });
}
//si esta en desarrollo o testing solo se consologuean los mensajes
else {
    logger = createLogger({
        levels,
        format: colorize(),
        transports: [
          new Console({ level: "HTTP", format: simple() }),
        ],
      });
}

export default logger;
