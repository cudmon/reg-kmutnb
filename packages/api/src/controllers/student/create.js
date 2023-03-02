const db = require("../../modules/database");

module.exports = async (req, res) => {
  let student_prefix = req.body.student_prefix;
  let student_first_name = req.body.student_first_name;
  let student_last_name = req.body.student_last_name;
  let student_sid = req.body.student_sid;
  let student_password = bcrypt.hashSync(req.body.student_password, 12);
  let program_id = req.body.program_id;

  if (
    student_prefix &&
    student_first_name &&
    student_last_name &&
    student_sid &&
    student_password &&
    program_id
  ) {
    db.execute(
      "INSERT INTO student (student_prefix, student_first_name, student_last_name, student_sid, student_password, program_id) VALUES (?,?,?,?,?,?)",
      [
        student_prefix,
        student_first_name,
        student_last_name,
        student_sid,
        student_password,
        program_id,
      ],
      (err, result) => {
        if (err) res.status(500).send({ message: err.message });
        res.status(200).send({
          message: "success",
          error: false,
        });
      }
    );
  } else {
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid body",
      },
    });
  }
};
