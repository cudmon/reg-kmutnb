const db = require("../../modules/database");

module.exports = async (req, res) => {
  const getID = req.params.id;
  const secNum = req.body.section_number;
  const secStart = req.body.section_start;
  const secEnd = req.body.section_end;
  const secDay = req.body.section_day;

  db.execute(
    `UPDATE section
     SET section_number = ${secNum},section_start = '${secStart}',section_end = '${secEnd}',section_day = ${secDay}
     WHERE section_id = ${getID};`,
    (err, result) => {
      if (err) {
        res.status(500).send({ message: err.message });
      }

      if (result.length === 0) {
        res.status(404).send({
          error: {
            code: 404,
            message: "Not Found",
          },
        });
      }
      res.status(200).send({
        message: "success",
        error: false,
      });
    }
  );
};
