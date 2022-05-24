import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import { dbConnectionString } from '../settings'
import vehicleModel from "../vehicles/model"

dotenv.config()

const sequelize = new Sequelize(dbConnectionString, { dialect: "postgres" });

vehicleModel(sequelize)

export default sequelize
