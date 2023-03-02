const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute(
    "DELETE FROM registration WHERE section_id=? AND student_id=?",
    [req.body.section_id, req.account_id],
    (err, result) => {
      if (err)
        res.status(400).send({
          error: {
            code: 400,
            message: "Invalid body",
          },
        });
      res.status(200).send({
        message: "Withdraw success",
        error: false,
      });
    }
  );
};
