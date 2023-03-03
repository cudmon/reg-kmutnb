const db = require("../../modules/database");

module.exports = async (req, res) => {
  db.execute("SELECT * FROM subject", (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message });
    }

    res.status(200).send(result);
  });
};
