const { Router } = require("express");
const auth = require("../middleware/auth");
const subject = require("../controllers/subject");

const route = Router();

route.get("/", [auth.verifyToken], subject.all);

module.exports = route;
