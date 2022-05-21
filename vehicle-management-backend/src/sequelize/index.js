import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import { dbConnectionString } from '../settings'

import vehicleModel from "./models/vehicle.model"
dotenv.config()

const sequelize = new Sequelize(dbConnectionString);

vehicleModel(sequelize)


export default sequelize