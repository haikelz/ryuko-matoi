import pinoLogger from "pino";
import pinoPretty from "pino-pretty";

export const logger = pinoLogger(pinoPretty());
