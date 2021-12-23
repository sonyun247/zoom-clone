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

wss.on("connection", (user) => {
  console.log("user Connected");
  user.on("close", () => {
    console.log("user Disconnected");
  });
  user.on("message", (message) => {
    console.log(`User : ${message}`);
  });
  user.send("Hi, how you doing?");
});

server.listen(port, handleListen);
