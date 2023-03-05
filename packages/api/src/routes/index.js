const { Router } = require("express");

const route = Router();

route.use("/auth", require("./auth"));
route.use("/sections", require("./section"));
route.use("/students", require("./student"));
route.use("/subjects", require("./subject"));
route.use("/registration", require("./registration"));

route.all("*", (req, res) => {
  res.status(404).send({
    error: {
      code: 404,
      message: "Not found",
    },
  });
});

module.exports = route;
