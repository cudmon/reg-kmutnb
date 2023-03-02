const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute(
    "SELECT * FROM teacher WHERE teacher_tid=?",
    [req.body.username],
    (err, result) => {
      if (err) res.status(500).send({ message: err.message });

      if (result.length === 0) {
        db.execute(
          "SELECT * FROM  student WHERE  student_sid=?",
          [req.body.username],
          (err, result) => {
            if (err) res.status(500).send({ message: err.message });
            // ถ้าไม่มีข้อมูลในตาราง Teacher และ Student ให้ส่งข้อความความผิด  404 กลับไป
            if (result.length === 0) {
              return res
                .status(403)
                .send({ message: " Not Student  and  teacher" });
            }

            //ตรวจสอบ password ของนักศึกษา โดยการเรียกใช้ bcrypt.compareSync() ****(การเข้ารหัส) โดยเอา password ที่ส่งมาจาก client มาเทียบกับ password ในฐานข้อมูล

            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              result[0].student_password
            );

            //ถ้า password ไม่ถูกต้องให้ส่งข้อความความผิด  400 กลับไป
            if (!passwordIsValid) {
              return res.status(403).send({
                error: {
                  code: 400,
                  message: "Invalid Username or Password",
                },
              });
            }
            //ถ้า password ถูกต้องให้สร้าง token โดยการเรียกใช้ jwt.sign() โดยเอา id ของนักศึกษามาเก็บไว้ใน token
            var token = jwt.sign(
              {
                id: result[0].student_id,
                student_sid: result[0].student_sid,
              },
              process.env.SECRET,
              {
                expiresIn: 86400 * 30,
              }
            );

            //ส่งข้อมูลกลับไปยัง client โดยส่ง id ของนักศึกษา ชื่อ นามสกุล และ token กลับไป
            res.status(200).send({
              role: "student",
              accessToken: token,
              name:
                result[0].student_first_name +
                " " +
                result[0].student_last_name,
            });
          }
        );
      } else {
        //ตรวจสอบ password ของอาจารย์ โดยการเรียกใช้ bcrypt.compareSync() ****(การเข้ารหัส) โดยเอา password ที่ส่งมาจาก client มาเทียบกับ password ในฐานข้อมูล
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          result[0].teacher_password
        );

        // ถ้า password ไม่ถูกต้องให้ส่งข้อความความผิด  400 กลับไป
        if (!passwordIsValid) {
          return res.status(403).send({
            error: {
              code: 400,
              message: "Invalid Username or Password",
            },
          });
        }

        //ถ้า password ถูกต้องให้สร้าง token โดยการเรียกใช้ jwt.sign() โดยเอา id ของอาจารย์มาเก็บไว้ใน token
        var token = jwt.sign(
          { id: result[0].teacher_id, teacher_tid: result[0].teacher_tid },
          process.env.SECRET,
          {
            expiresIn: 86400 * 30,
          }
        );

        //ส่งข้อมูลกลับไปยัง client โดยส่ง id ของอาจารย์ ชื่อ นามสกุล และ token กลับไป
        res.status(200).send({
          role: "teacher",
          accessToken: token,
          name:
            result[0].teacher_first_name + " " + result[0].teacher_last_name,
        });
      }
    }
  );
};
