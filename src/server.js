import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`localhost:${port}`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const users = [];

wss.on("connection", (user) => {
  users.push(user);
  console.log("user Connected");

  user.on("close", () => {
    console.log("user Disconnected");
  });
  user.on("message", (message) => {
    users.forEach((aUser) => aUser.send(message.toString()));
  });
});

server.listen(port, handleListen);
