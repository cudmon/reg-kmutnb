const { Router } = require("express");

const route = Router();

route.use("/auth", require("./auth"));
route.use("/section", require("./section"));
route.use("/student", require("./student"));
route.use("/subject", require("./subject"));
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
