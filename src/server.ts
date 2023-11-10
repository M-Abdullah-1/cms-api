import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../config.env") });

import app from "./app";
import { connectToDatabase } from "./utils/database.util";

// Call the function with the provided database password
connectToDatabase(process.env.DATABASE_PASSWORD as string);

/**
 *  Starts the server on the specfied port.
 *
 *  @param {number} - The port number on the server should listen.
 *  @param {Function} - The callback function to be executed when the server is running.
 */
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
