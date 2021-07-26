const express = require("express");
const app = express();
const server = require("http").Server(app);

const config = require("./config");

const cors = require("cors");
const socket = require("./socket");
const db = require("./db");
const router = require("./network/routes");

db(config.dbUrl);

app.use(cors());
// this replace body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socket.connect(server);

// app.use(router);
router(app);

app.use("/app", express.static("public"));

server.listen(config.port, () => {
  console.log(`La aplicación se inicializo en ${config.host}:${config.port}`);
});
