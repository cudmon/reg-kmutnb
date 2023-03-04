const db = require("../../modules/database");

module.exports = async (req, res) => {
  let subject = req.body.subject_code;
  if (req.body.subject_code && req.body.section_number && req.account_id) {
    db.execute(
      //subject_input
      "SELECT section_id FROM section RIGHT JOIN `subject` ON section.subject_id=`subject`.subject_id WHERE section_number=? AND subject_code=?",
      [req.body.section_number, req.body.subject_code],
      (err, subject_input) => {
        // console.log("subject_input is")
        // console.log(subject_input)
        if (!subject_input[0]) {
          res.status(404).send({
            error: {
              code: 404,
              message: "subject not found",
            },
          });
        } else {
          // console.log(subject_input)
          // res.status(200).send(subject_input)
          db.execute(
            //subject from regis
            "SELECT	subject_code FROM registration RIGHT JOIN section ON registration.section_id=section.section_id RIGHT JOIN `subject` ON section.subject_id=`subject`.subject_id WHERE student_id=?",
            [req.account_id],
            (err, subject_fregis) => {
              // res.status(200).send(subject_fregis)
              let subjectcheck = subject_fregis.find((a) => {
                return a.subject_code == subject;
              });
              // console.log(subject)
              // console.log(subjectcheck)
              if (subjectcheck) {
                res.status(400).send({
                  //ต้องแก้ status
                  error: {
                    code: 400,
                    message: "This subject has registed",
                  },
                });
              } else {
                subject_input.forEach((Element) => {
                  db.execute(
                    "INSERT INTO registration (section_id,student_id) VALUES (?,?)",
                    [Element.section_id, req.account_id],
                    (err_regis, result) => {
                      if (err_regis) {
                        res.status(400).send({
                          error: {
                            code: 400,
                            message: "Invalid body",
                          },
                        });
                      } else {
                        res.status(200).send({
                          message: "Registration Success",
                          error: false,
                        });
                      }
                    }
                  );
                });
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
