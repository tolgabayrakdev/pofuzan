import pino from "pino";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logsDir = path.join(__dirname, "..", "..", "logs");

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const isProduction = process.env.NODE_ENV === "production";

const transport = isProduction
    ? {
          targets: [
              {
                  target: "pino/file",
                  options: { destination: path.join(logsDir, "error.log"), level: "error" }
              },
              {
                  target: "pino/file",
                  options: { destination: path.join(logsDir, "combined.log") }
              }
          ]
      }
    : {
          targets: [
              {
                  target: "pino-pretty",
                  options: { colorize: true, translateTime: "SYS:standard" }
              }
          ]
      };

const logger = pino({
    level: isProduction ? "info" : "debug",
    transport,
    formatters: {
        bindings: (bindings) => ({
            pid: bindings.pid,
            hostname: bindings.hostname,
            nodeVersion: bindings.nodeVersion
        })
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            path: req.path,
            parameters: req.parameters,
            headers: req.headers
        }),
        res: (res) => ({
            statusCode: res.statusCode
        }),
        err: (err) => ({
            type: err.type,
            message: err.message,
            stack: err.stack
        })
    }
});

export default logger;