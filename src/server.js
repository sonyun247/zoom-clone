import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`localhost:${port}`);

const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log(socket);
});

server.listen(port, handleListen);
