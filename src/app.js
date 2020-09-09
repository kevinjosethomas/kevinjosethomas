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

import HomeRoute from "./routes/home.js";
import AwardsRoute from "./routes/awards.js";
import SocialsRoute from "./routes/socials.js";
import ProjectsRoute from "./routes/projects.js";

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
      styleSrc: ["'self'", "fontsforweb.com", "cdn.jsdelivr.net", "fonts.googleapis.com"],
      scriptSrc: ["'self'", "ajax.googleapis.com", "cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "fontsforweb.com", "fonts.googleapis.com", "cdn.jsdelivr.net", "fonts.gstatic.com"],
      frameSrc: ["'self'"],
      upgradeInsecureRequests: []
    },
    reportOnly: false
  })
)


app.use("/public", express.static(path.join(__dirname, "/public")));

app.use("/", HomeRoute);
app.use("/awards", AwardsRoute);
app.use("/socials", SocialsRoute);
app.use("/projects", ProjectsRoute);


server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server Started on PORT ${process.env.PORT}`);
})
