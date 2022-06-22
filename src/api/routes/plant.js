import express from "express";
import { DatabaseError } from "sequelize";
import { getBDD } from "../../database/database.js";
import { Plant } from "../../database/models/Plant.js";
import error501 from "../errors/error501.js";
import mustBeAdmin from "../middleware/mustBeAdmin.js";
const plant = express.Router();

const bdd = getBDD();

/**
 * OPTIONS for /
 */
plant.options("/",
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.send(200);
  })


/**
 * Return all plants
 */
plant.get("/", async (req, res, next) => {
  try {
    const allPlants = await Plant.findAll();
    res.status(200).json(allPlants);
  } catch (error) {
    next(error);
  }

});

plant.post("/", mustBeAdmin);
/**
 * Add a new plant
 */
plant.post("/", async (req, res, next) => {
  try {
    const newPlant = await Plant.create({ ...req.body });
    res.status(201).json(newPlant.toJSON());
  } catch (error) {
    // @ts-ignore
    if (error instanceof DatabaseError && error.original.code === "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(422).json({
        code: 422,
        message: `Required fields are missing in the request body${process.env.NODE_ENV === "dev" ? " [[[[ " + error.original.text + " ]]]]" : ""}`
      });
      return;
    }

    next(error);
  }
});

/**
 * OPTIONS for /:id
 */
plant.options("/:id",
  /**
   * 
   * @param {express.Request} req 
   * @param {express.Response} res 
   */
  (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, PUT, PATCH');
    res.send(200);
  })

/**
 * Return a specific plant with her ID
 */
plant.get("/:id", async (req, res, next) => {
  try {
    const plantid = await Plant.findOne({ where: { id: req.params.id } });

    if (!plantid) {
      res.status(404).json({
        code: 404,
        message: `Not plant found with id ${req.params.id}`
      });
      return;
    }

    res.status(200).json(plantid);

  } catch (error) {
    next(error);
  }
});

plant.delete("/:id", mustBeAdmin);
/**
 * Delete a specific plant with her ID
 * Require to be logged
 */
plant.delete("/:id", async (req, res, next) => {
  try {
    const nbDeleteRow = await Plant.destroy({ where: { id: req.params.id } });

    if (nbDeleteRow < 1) {
      res.status(404).json({
        code: 404,
        message: `Not plant found with id ${req.params.id}`
      });
      return;
    }

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

plant.put("/:id", mustBeAdmin);
/**
 * Create or update a specific plant with her ID
 * Required to be logged
 */
plant.put("/:id", async (req, res, next) => {
  try {
    const newOrUpdatedPlant = await Plant.upsert({ id: req.params.id, ...req.body });

    if (newOrUpdatedPlant[1])
      res.status(201).json(newOrUpdatedPlant[0].toJSON())
    else
      res.status(204).send()

  } catch (error) {
    // @ts-ignore
    if (error instanceof DatabaseError && error.original.code === "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(422).json({
        code: 422,
        message: `Plant with id ${req.params.id} doesn't exist and required fields are missing in the request body${process.env.NODE_ENV === "dev" ? " [[[[ " + error.original.text + " ]]]]" : ""}`
      });
      return;
    }

    next(error);
  }
});

plant.patch("/:id", mustBeAdmin);
/**
 * Partial update a specific plant with her ID
 * Require to be logged
 */
plant.patch("/:id", async (req, res, next) => {
  try {
    const nbUpdatedPlants = await Plant.update({ ...req.body }, { where: { id: req.params.id } });

    console.log(nbUpdatedPlants);

    if (nbUpdatedPlants[0] < 1) {
      res.status(404).json({
        code: 404,
        message: `Not plant found with id ${req.params.id}`
      });
      return;
    }

    res.status(204).send();

  } catch (error) {
    next(error);
  }
});

export default plant;