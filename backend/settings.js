const dotenv = require('dotenv');

dotenv.config();
export const dbConnectionString = process.env.DB_CONNECTION_STRING;
export const frontendAddress = process.env.FRONTEND_ADDRESS;
