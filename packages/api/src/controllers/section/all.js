const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute(
    //SQL section teacerb subject
    "SELECT section.section_id,section.section_number,section.section_start,section.section_end ,section.section_day, subject.subject_name ,subject.subject_code ,teacher.teacher_first_name,teacher.teacher_last_name,teacher.teacher_tid FROM section INNER JOIN subject ON section.subject_id = subject.subject_id INNER JOIN teacher ON  section.teacher_id = teacher.teacher_id",
    (err, result) => {
      if (err) res.status(500).send({ message: err.message });
      res.status(200).send({ section: result });
    }
  );
};
