const { Router } = require("express");
const auth = require("../controllers/auth");

const route = Router();

route.post("/login", auth.login);

module.exports = route;
