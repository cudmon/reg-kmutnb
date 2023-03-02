const jwt = require("jsonwebtoken");
const db = require("../modules/database");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No Token provided!",
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.account_id = decoded.id;
    next();
  });
};

isStudent = (req, res, next) => {
  db.execute(
    "SELECT * FROM student WHERE `student_id` = ?",
    [req.account_id],
    (err, result) => {
      if (err || result.length == 0)
        res.status(403).send({ message: "Student Only" });
      if (result.length == 1) {
        next();
        return;
      }
    }
  );
};

isTeacher = (req, res, next) => {
  db.execute(
    "SELECT * FROM teacher WHERE `teacher_id` = ?",
    [req.account_id],
    (err, result) => {
      if (err || result.length == 0)
        res.status(403).send({ message: "Teacher Only" });
      if (result.length == 1) {
        next();
        return;
      }
    }
  );
};

const authJwt = {
  verifyToken: verifyToken,
  isTeacher: isTeacher,
  isStudent: isStudent,
};
module.exports = authJwt;
