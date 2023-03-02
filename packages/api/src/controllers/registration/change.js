const db = require("../../modules/database");

module.exports = async (req, res) => {
  let account_id = req.account_id;
  if (req.body.subject_id && req.body.section_number) {
    let all_account_section = await new Promise((resolve) => {
      db.execute(
        "SELECT * FROM `registration` WHERE `student_id`=?",
        [account_id],
        (err, result) => {
          if (result) resolve(result);
        }
      );
    });

    let old_select_section = await new Promise((resolve) => {
      db.execute(
        "SELECT * FROM `subject` LEFT JOIN section ON `subject`.subject_id = section.subject_id WHERE subject.subject_id =?",
        [req.body.subject_id],
        (err, result) => {
          resolve({
            all_section: result,
            account_old_section: all_account_section.find((a) => {
              return result.find((b) => {
                return a.section_id == b.section_id;
              });
            }),
          });
        }
      );
    });

    let new_select_selection = old_select_section.all_section.find((a) => {
      return a.section_number == req.body.section_number;
    });

    //Update Registration with new section_id check by [old_select_section.registration_id]
    if (new_select_selection) {
      if (old_select_section.account_old_section) {
        db.execute(
          "UPDATE registration SET section_id=? WHERE registration_id=?",
          [
            new_select_selection.section_id,
            old_select_section.account_old_section.registration_id,
          ],
          (err, result) => {
            //Insert New Select Section Log To Activity
            // db.execute("", [], () => {});
            //Insert Old Select Section Log To Activity
            // db.execute("", [], () => {});

            res.status(200).send({
              message: "change-section success",
              error: false,
            });
          }
        );
      } else {
        res.status(404).send({
          error: {
            code: 404,
            message:
              "You Not Register This Subject. You Can't Change Section. Please Register First",
          },
        });
      }
    } else {
      res.status(404).send({
        error: {
          code: 404,
          message: "This Section Number Not Found",
        },
      });
    }
  } else {
    res.status(200).send({
      error: {
        code: 400,
        message: "Invalid body",
      },
    });
  }
};
