import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { initBDD } from "../database/database.js";

/**
 * Setup des variables d'environnement
 */

dotenv.config({path: "config/api.env"});

initBDD();

const app = express();

/**
 * Middlewares
 */

import logger from "./middleware/logger.js";

app.use(logger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Routes
 */
import plant from "./routes/plant.js";

app.use('/plant', plant);

/**
 * Handle errors
 */

import error400 from "./errors/error400.js";
import error500 from "./errors/error500.js";

app.use(error400);
app.use(error500);

app.listen(process.env.EXPRESS_PORT || 3000, () => {
  console.log(`Listening at http://localhost:${process.env.EXPRESS_PORT || 3000}`);
});