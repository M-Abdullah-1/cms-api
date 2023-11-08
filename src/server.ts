const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../config.env") });

const app = require("./app");

// database connection
const mongoose = require("mongoose");
const DB_PWD = process.env.DATABASE_PASSWORD;
if (DB_PWD !== undefined) {
  const DB = process.env.DATABASE?.replace("<PASSWORD>", DB_PWD);
  mongoose.connect(DB).then(() => console.log("DB connection successfull!"));
} else {
  console.log(`DB_PASSWORD is undefined!`);
}

/*
@process.env.PORT : passing the port number for serve

function: passing function, when the server is running then this callback function will execute.
*/
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
