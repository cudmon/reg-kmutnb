const db = require("../../modules/database");

module.exports = async (req, res) => {
  const subject_list_check = req.body.subject_id;
  const subject_list = [
    ...new Map(
      subject_list_check.map(
        (
          m //จัด array
        ) => [m.section_id, m]
      )
    ).values(),
  ];

  if (req.body.subject_id && req.account_id) {
    //check json file null or not null
    let errVar = 0;
    let tableErr = 0;
    let subjectfound = 0;

    for await (let Element of subject_list) {
      // subject from sec
      let subjectfoundcheck = await new Promise(async (resolve) => {
        db.execute(
          "SELECT * FROM section WHERE section_id=?",
          [Element.section_id],
          (err, result) => {
            //console.log(result)
            if (!result[0]) {
              //console.log("ไม่มีวิชา")
              subjectfound++;
            }
            resolve(result);
          }
        );
      });
    }
    console.log(subjectfound);
    if (subjectfound == 0) {
      //check subject ======
      let subject_from_sec = new Array();

      let subject_from_regis = await new Promise(async (resolve) => {
        //subject from regis
        db.execute(
          "SELECT section.subject_id FROM `section` RIGHT JOIN registration ON section.section_id=registration.section_id WHERE student_id=?",
          [req.account_id],
          (err, result) => {
            resolve(result);
          }
        );
      });
      console.log("subject from regis");
      console.log(subject_from_regis);

      for await (let Element of subject_list) {
        // subject from sec
        let getsubjectsec = await new Promise(async (resolve) => {
          db.execute(
            "SELECT subject_id FROM section WHERE section_id=?",
            [Element.section_id],
            (err, result) => {
              resolve({
                subject_id: result[0].subject_id,
              });
            }
          );
        });
        subject_from_sec.push(getsubjectsec);
      }
      console.log("subject from sec");
      console.log(subject_from_sec);

      let subjectcheck = subject_from_sec.find((a) => {
        // หาวิชาซ้ำกันใน sec and regis
        return subject_from_regis.find((b) => {
          return a.subject_id == b.subject_id;
        });
      });
      console.log(subjectcheck);
      //=====================

      if (!subjectcheck) {
        //check subject from section_id ว่า เซค 1 2 วิชาซ้ำกัน
        db.execute(
          "SELECT section_id FROM registration WHERE student_id=?",
          [req.account_id],
          async (err, result) => {
            // console.log(result)

            for await (let subject of subject_list) {
              tablecheck = result.find((a) => {
                return a.section_id == subject.section_id;
              });
              if (!tablecheck) {
                let check = await new Promise((resolve, reject) => {
                  db.execute(
                    "INSERT INTO registration (section_id,student_id) VALUES (?,?) ",
                    [subject.section_id, req.account_id],
                    (err, result) => {
                      if (err) {
                        resolve({
                          status: false,
                          err: err,
                        });
                      }
                      if (result) {
                        resolve({
                          status: true,
                          result: result,
                        });
                      }
                    }
                  );
                });
                if (check.status == false) {
                  errVar++;
                }
              } else {
                tableErr++;
              }
            }
            if (tableErr > 0) {
              res.status(400).send({
                error: {
                  code: 400,
                  message: "มีบ้างวิชาลง sec อื่นหรือ sec นั้นไว้แล้ว",
                },
              });
            } else if (errVar > 0) {
              console.log(errVar);
              res.status(400).send({
                error: {
                  code: 400,
                  message: "Invalid body",
                },
              });
            } else {
              res.status(200).send({
                success: {
                  message: "registration success",
                  error: false,
                },
              });
            }
          }
        );
      } else {
        //!subjectcheck
        res.status(400).send({
          error: {
            code: 400,
            message: "มีวิชาซ้ำคนละเซคหรือเซคเดียวกัน",
          },
        });
      }
    } else {
      res.status(404).send({
        error: {
          code: 404,
          message: "Subject not found",
        },
      });
    }
  } else {
    //if แรก เช็คว่าง
    res.status(400).send({
      error: {
        code: 400,
        message: "Invalid body",
      },
    });
  }
};
