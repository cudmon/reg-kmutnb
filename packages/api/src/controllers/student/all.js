const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute(
    // execute SQL statement ในการเลือกข้อมูลนักศึกษาจากฐานข้อมูล
    "SELECT  student.student_id,student.student_prefix, student.student_first_name,student.student_last_name,student.student_sid,program.program_name,major.major_name,department.department_name,faculty.faculty_name FROM student INNER JOIN program ON student.program_id = program.program_id INNER JOIN major ON program.major_id = major.major_id  INNER JOIN department ON major.department_id = department.department_id INNER JOIN faculty ON department.faculty_id = faculty.faculty_id ",
    (err, result) => {
      // ถ้ามีข้อผิดพลาดให้ส่งข้อความความผิด  500 กลับไป
      if (err) res.status(500).send({ message: err.message });
      // ถ้าไม่มีข้อมูลในตาราง Student ให้ส่งข้อความความผิด  404 กลับไป
      if (result.length === 0) {
        return res.status(404).send({ message: "Student Not found." });
      }
      res.status(200).send({ student: result });
    }
  );
};
