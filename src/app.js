import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import dotenv from "dotenv";
import helmet from "helmet";
import csp from "helmet-csp";
import express from "express";
import { fileURLToPath } from "url";
import body_parser from "body-parser";
import compression from "compression";

dotenv.config();
const app = express();
global.__dirname = path.dirname(fileURLToPath(import.meta.url));

let server = http.createServer(app);

global.debug = (message) => {
  if (process.env.DEBUG_MODE) console.debug(message);
}

app.use(helmet());
app.use(compression());
app.use(body_parser.json());

app.use(
  csp({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'"],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'"],
      frameSrc: ["'self'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  })
)

server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server Started on PORT ${process.env.PORT}`);
})
