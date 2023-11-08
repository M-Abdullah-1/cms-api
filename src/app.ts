import express from "express";
const morgan = require("morgan");

const bookRoute = require("./routes/book.route");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/book", bookRoute);

app.get("/api/v1/health-check", (req, res, next) => {
  return res.status(200).json({
    status: "success",
    data: {
      msg: "server is running!",
    },
  });
});

module.exports = app;
