const db = require("../../modules/database");

module.exports = async (req, res) => {
  if (req.params.id && req.account_id) {
    db.execute(
      "SELECT subject_id FROM section WHERE section_id=? AND teacher_id=?",
      [req.params.id, req.account_id],
      (err, result) => {
        console.log(result[0]);
        if (!result[0]) {
          //console.log("ไม่มีวิชา")
          res.status(403).send({
            error: {
              code: 403,
              message: "Forbidden",
            },
          });
        } else {
          //console.log("มีวิชาลบได้")
          db.execute(
            "SELECT * FROM registration WHERE section_id=? ",
            [req.params.id],
            (err, result) => {
              // res.status(200).send(result)
              // console.log(result[0])
              if (!result[0]) {
                //ไม่มี Regis ลบได้เลย
                //console.log("ไม่มี Regis ลบได้เลย")
                db.execute(
                  "DELETE FROM section WHERE section_id=? AND teacher_id=?",
                  [req.params.id, req.account_id],
                  (err, result) => {
                    res.status(200).send({
                      message: "success",
                      error: false,
                    });
                  }
                );
              } else {
                //มี Regis ลบ Regis ก่อน
                //console.log("มี Regis ลบ Regis ก่อน")
                db.execute(
                  "DELETE FROM registration WHERE section_id=?",
                  [req.params.id],
                  (err, result) => {
                    db.execute(
                      "DELETE FROM section WHERE section_id=? AND teacher_id=?",
                      [req.params.id, req.account_id],
                      (err, result) => {
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
        }
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
