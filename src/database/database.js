import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

/**
 * Setup
 */

dotenv.config({path: "config/bdd.env"});

/**
 * @type Sequelize
 */
let BDDInstance;

export function initBDD(){
  const instance = new Sequelize(
    process.env.BDD_DATABASE || "",
    process.env.BDD_USERNAME || "",
    process.env.BDD_PASSWORD || "",
    {
      dialect: process.env.BDD_DRIVER || "mariadb",
      host: process.env.BDD_HOSTNAME || ""
    }
  );
  
  try {
    instance.authenticate();
    BDDInstance = instance;
    return instance;
  }
  catch(error) {
    console.error("Unable to connect to the database", error);
    return null;
  }
}

export function getBDD(){
  return BDDInstance ?? initBDD();
}

export function closeBDD(){
  BDDInstance.close();
}