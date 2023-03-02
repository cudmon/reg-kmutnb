const db = require("../../modules/database");

module.exports = async (req, res) => {
  const id = req.account_id;

  db.execute(
    "SELECT * FROM `registration` INNER JOIN section ON registration.section_id=section.section_id INNER JOIN subject ON subject.subject_id=section.subject_id INNER JOIN teacher ON section.teacher_id=teacher.teacher_id WHERE student_id=?",
    [id],
    (err, result) => {
      res.status(200).send(result);
    }
  );
};
