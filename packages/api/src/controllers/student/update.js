const db = require("../../modules/database");

module.exports = async (req, res) => {
  const stdID = req.params.id;
  const stdPrefix = req.body.prefix;
  const stdFname = req.body.firstName;
  const stdLname = req.body.lastName;
  if (
    typeof stdPrefix != "string" ||
    typeof stdFname != "string" ||
    typeof stdLname != "string"
  ) {
    res.status(400).send({
      error: {
        code: 404,
        message: "Invalid body",
      },
    });
  }
  db.execute(
    ` UPDATE student
        SET student_prefix = "${stdPrefix}", student_first_name = "${stdFname}", student_last_name = "${stdLname}"
        WHERE student_id = ${stdID};`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      if (result.length === 0) {
        res.status(404).send({
          error: {
            code: 404,
            message: "NOT FOUND",
          },
        });
      }
      res.status(200).send({
        message: "success",
        error: false,
      });
    }
  );
};
