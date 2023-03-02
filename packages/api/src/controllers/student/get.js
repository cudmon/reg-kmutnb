const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute(
    //SQL ตารางstudent program major department
    "SELECT  student.student_prefix, student.student_first_name,student.student_last_name,student.student_sid,program.program_name,major.major_name,department.department_name,faculty.faculty_name FROM student INNER JOIN program ON student.program_id = program.program_id INNER JOIN major ON program.major_id = major.major_id  INNER JOIN department ON major.department_id = department.department_id INNER JOIN faculty ON department.faculty_id = faculty.faculty_id WHERE student_id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        res.status(404).send({
          error: {
            code: 404,
            message: "Not Found",
          },
        });
      res.status(200).send({ student: result });
    }
  );
};
