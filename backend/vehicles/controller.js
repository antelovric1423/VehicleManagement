import { getIdParam } from "../helpers";
import Joi from "joi"
import sequelize from "../sequelize";
import { vehicleSchema } from "./validation";

export async function vehiclesGetAll(req, res) {
  const vehicles = await sequelize.models.Vehicles.findAll({ attributes: ["id", "make", "model", "year"] });
  res.status(200).json(vehicles);
}

export async function vehiclesPost(req, res) {
  try {
    Joi.assert(req.body, vehicleSchema)
  } catch (error) {
    res.status(400).send("Invalid request")
    return
  }

  const vehicle = {
    make: req.body.make.toUpperCase(),
    model: req.body.model.toUpperCase(),
    year: Number(req.body.year)
  }

  let dbVehicle = await sequelize.models.Vehicles.findOne({
    where: { ...vehicle }
  })

  if (dbVehicle !== null) {
    res.status(400).send("Item already exists")
    return
  }

  const importedVehicle = await sequelize.models.Vehicles.create(vehicle)
  const resBody = {
    id: importedVehicle.dataValues.id,
    make: importedVehicle.dataValues.make,
    model: importedVehicle.dataValues.model,
    year: importedVehicle.dataValues.year,
  }

  res.status(200).send(resBody)
}

export async function vehiclesPut(req, res) {
  const id = getIdParam(req);

  try {
    Joi.assert(req.body, vehicleSchema)
  } catch (error) {
    res.status(400).send("Invalid request")
    return
  }

  const vehicle = {
    make: req.body.make.toUpperCase(),
    model: req.body.model.toUpperCase(),
    year: Number(req.body.year)
  }

  let dbVehicle = await sequelize.models.Vehicles.findOne({
    where: { ...vehicle }
  })
  if (dbVehicle !== null) {
    res.status(400).send("Item already exists")
    return
  }

  dbVehicle = await sequelize.models.Vehicles.findOne({
    where: { id: id }
  })
  if (dbVehicle === null) {
    res.status(400).send("Item not found")
    return
  }

  dbVehicle.make = vehicle.make;
  dbVehicle.model = vehicle.model;
  dbVehicle.year = vehicle.year;
  await dbVehicle.save();

  res.status(200).send({
    id: dbVehicle.id,
    make: dbVehicle.make,
    model: dbVehicle.model,
    year: dbVehicle.year,
  })
}

export async function vehiclesDeleteById(req, res) {
  const id = getIdParam(req);
  await sequelize.models.Vehicles.destroy({ where: { id: id } });
  res.status(200).end();

}
