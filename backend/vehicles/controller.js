import sequelize from "../sequelize";
import { getIdParam } from "../helpers";
import { vehiclePostSchema } from "./validation";
import Joi from "joi"

export async function vehiclesGetAll(req, res) {
  const vehicles = await sequelize.models.Vehicles.findAll({ attributes: ["id", "make", "model", "year"] });
  res.status(200).json(vehicles);
}

export async function vehiclesPost(req, res) {
  try {
    Joi.assert(req.body, vehiclePostSchema)
  } catch (error) {
    res.status(400).send("Invalid request")
    return
  }

  const vehicle = {
    make: req.body.make.toUpperCase(),
    model: req.body.model.toUpperCase(),
    year: Number(req.body.year)
  }

  const vehicles = await sequelize.models.Vehicles.findAll({
    where: { ...vehicle }
  })

  if (vehicles.length != 0) {
    res.status(400).send("Item already exists")
    return
  }

  const importedVehicle = await sequelize.models.Vehicles.create(vehicle)
  res.status(200).send(importedVehicle)
}

export async function vehiclesDeleteById(req, res) {
  const id = getIdParam(req);
  await sequelize.models.Vehicles.destroy({ where: { id: id } });
  res.status(200).end();

}
