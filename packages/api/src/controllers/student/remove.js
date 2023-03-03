const db = require("../../modules/database");

module.exports = async (req, res) => {
  let student_id = req.params.id;
  // SELECT  ข้อมูล  จากตาราง registration  ดูว่านักเรียน ลงทะเบียน หรือไม่
  db.execute(
    "SELECT  * FROM  registration WHERE student_id = ?",
    [student_id],
    (err, result) => {
      if (err) res.status(500).send({ message: err.message });
      //เช็คว่านักเรียน ลงทะเบียน หรือไม่
      if (!result[0]) {
        //ถ้าไม่ลงทะเบียน ให้ลบข้อมูลนักเรียน ออกจากตาราง student
        db.execute(
          "DELETE FROM student WHERE student_id=?",
          [student_id],
          (err, result) => {
            if (err) res.status(500).send({ message: err.message });
            //ส่งข้อมูลกลับไปยัง client
            res.status(200).send({
              message: "success",
              error: false,
            });
          }
        );
        //ถ้าลงทะเบียน ให้ลบข้อมูลนักเรียน ออกจากตาราง registration และ student
      } else {
        db.execute(
          "DELETE FROM registration WHERE student_id=?",
          [student_id],
          (err, result) => {
            db.execute(
              "DELETE FROM student WHERE student_id=?",
              [student_id],
              (err, result) => {
                if (err) res.status(500).send({ message: err.message });
                res.status(200).send({
                  message: "success",
                  error: false,
                });
              }
            );
          }
        );
      }
    }
  );
};
