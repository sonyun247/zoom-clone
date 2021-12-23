const messageForm = document.querySelector("form");
const messageList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Server Connected");
});

socket.addEventListener("close", () => {
  console.log("Server Disconnected");
});

socket.addEventListener("message", (message) => {
  console.log(`Server : ${message.data}`);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
