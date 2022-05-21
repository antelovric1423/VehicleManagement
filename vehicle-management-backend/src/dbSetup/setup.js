import sequelize from "../sequelize/"

async function resetDB() {
    const vehicleDataSet = require("./VehicleInfo.json")
    await sequelize.sync({ force: true })
    await sequelize.models.Vehicles.bulkCreate(vehicleDataSet)
}

resetDB();