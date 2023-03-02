const { Router } = require("express");
const auth = require("../middleware/auth");
const registration = require("../controllers/registration");

const route = Router();

route.get("/", [auth.verifyToken, auth.isStudent], registration.home);
route.post("/regis", [auth.verifyToken, auth.isStudent], registration.regis);
route.post("/change", [auth.verifyToken, auth.isStudent], registration.change);
route.post(
  "/withdraw",
  [auth.verifyToken, auth.isStudent],
  registration.withdraw
);

module.exports = route;
