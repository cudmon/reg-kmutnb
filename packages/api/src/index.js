const cors = require("cors");
const express = require("express");
const routes = require("./routes");

const server = express();

// ENV
const PORT = process.env.PORT || 80;
const HOST = process.env.HOST || "127.0.0.1";

// JSON
server.use(
  express.json({
    limit: 10000000,
  })
);

// CORS
server.use(
  cors({
    origin: "*",
  })
);

// Router
server.use(routes);

// Error handler
server.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({
      error: {
        code: 500,
        message: "Internal server error",
      },
    });
  }

  next();
});

// Open connection
server.listen(PORT, HOST, () => {
  console.clear();
  console.log(`Server running at ${HOST}:${PORT}`);
});
