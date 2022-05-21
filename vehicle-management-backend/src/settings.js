const dotenv = require("dotenv");

dotenv.config();
export const testEnvVariable = process.env.TEMP_ENV_VARIABLE;
export const dbConnectionString = process.env.DB_CONNECTION_STRING;