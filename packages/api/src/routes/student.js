const { Router } = require("express");
const auth = require("../middleware/auth");
const student = require("../controllers/student");

const route = Router();

route.get("/", [auth.verifyToken, auth.isTeacher], student.all);
route.get("/:id", [auth.verifyToken, auth.isTeacher], student.get);
route.post("/", [auth.verifyToken, auth.isTeacher], student.create);
route.patch("/:id", [auth.verifyToken, auth.isTeacher], student.update);
route.delete("/:id", [auth.verifyToken, auth.isTeacher], student.remove);

module.exports = route;
