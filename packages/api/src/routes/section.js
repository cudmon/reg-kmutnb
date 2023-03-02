const { Router } = require("express");
const auth = require("../middleware/auth");
const section = require("../controllers/section");

const route = Router();

route.get("/", [auth.verifyToken], section.all);
route.get("/:id", [auth.verifyToken], section.get);
route.post("/", [auth.verifyToken, auth.isTeacher], section.create);
route.patch("/:id", [auth.verifyToken, auth.isTeacher], section.update);
route.delete("/:id", [auth.verifyToken, auth.isTeacher], section.remove);

module.exports = route;
