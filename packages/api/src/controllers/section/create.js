const db = require("../../modules/database");

module.exports = async (req, res) => {
  //ประกาศตัวแปรเก็บข้อมูลที่ส่งมาจาก client
  let section_number = req.body.section_number;
  let section_start = req.body.section_start;
  let section_end = req.body.section_end;
  let section_day = req.body.section_day;
  let subject_id = req.body.subject_id;
  let teacher_id = req.body.teacher_id;
  let semester_id = req.body.semester_id;

  //ตรวจสอบข้อมูลที่ส่งมาจาก client ว่ามีข้อมูลหรือไม่
  if (
    !section_number ||
    !section_start ||
    !section_end ||
    !section_day ||
    !subject_id ||
    !teacher_id ||
    !semester_id
  ) {
    return res.status(400).send({
      error: {
        code: 400,
        message: "Invalid body",
      },
    });
  }
  //เรียกใช้ execute() สำหรับเพิ่มข้อมูลเข้าตาราง section
  db.execute(
    "INSERT INTO section (section_number,section_start,section_end,section_day,subject_id,teacher_id,semester_id) VALUES (?,?,?,?,?,?,?) ",
    [
      section_number,
      section_start,
      section_end,
      section_day,
      subject_id,
      teacher_id,
      semester_id,
    ],
    (err, result) => {
      if (err) res.status(500).send({ message: err.message });
      //ส่งข้อมูลกลับไปยัง client
      res.status(200).send({
        message: "success",
        error: false,
      });
    }
  );
};
