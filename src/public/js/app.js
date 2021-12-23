const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Server Connected");
});

socket.addEventListener("close", () => {
  console.log("Server Disconnected");
});

socket.addEventListener("message", (message) => {
  console.log(`Server : ${message.data}`);
  setTimeout(() => {
    socket.send("Hi, I'm good, thanks");
  }, 1000);
});
