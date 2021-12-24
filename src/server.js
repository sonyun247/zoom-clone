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
  user["nickname"] = "anonymous";
  console.log("user Connected");

  user.on("close", () => {
    console.log("user Disconnected");
  });
  user.on("message", (message) => {
    const parsedChat = JSON.parse(message);
    switch (parsedChat.type) {
      case "nickname":
        user["nickname"] = parsedChat.payload;
      case "message":
        users.forEach((aUser) =>
          aUser.send(`${user.nickname}: ${parsedChat.payload}`)
        );
    }
  });
});

server.listen(port, handleListen);
