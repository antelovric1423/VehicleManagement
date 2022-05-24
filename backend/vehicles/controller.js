import sequelize from "../sequelize";
import { getIdParam } from "../helpers";

export async function vehiclesGetAll(req, res) {
    const vehicles = await sequelize.models.Vehicles.findAll({ attributes: ["id", "make", "model", "year"] });
    res.status(200).json(vehicles);
}

export async function vehiclesPost(req, res) {
    const numAllowedParams = 3
    if (!req.body.make || !req.body.model || !req.body.year) {
        res.status(400).send("Request does not contain required parameters")
        return
    }
    if (Number.isNaN(Number(req.body.year)) || typeof (req.body.make) != "string" || typeof (req.body.model) != "string") {
        res.status(400).send("Request contains invalid parameter values")
        return
    }
    if (Object.keys(req.body).length != numAllowedParams) {
        res.status(400).send("Request contains non-required parameters")
        return
    }

    const vehicle = {
        make: req.body.make.toUpperCase(),
        model: req.body.model.toUpperCase(),
        year: Number(req.body.year)
    }

    const vehicles = await sequelize.models.Vehicles.findAll({
        where: {
            make: req.body.make,
            model: req.body.model,
            year: Number(req.body.year)
        }
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
