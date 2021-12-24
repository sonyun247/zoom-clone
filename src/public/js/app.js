const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const messageList = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);
const makeObject = (type, payload) => {
  const chatObject = { type, payload };
  return JSON.stringify(chatObject);
};

socket.addEventListener("open", () => {
  console.log("Server Connected");
});

socket.addEventListener("close", () => {
  console.log("Server Disconnected");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeObject("message", input.value));
  input.value = "";
});

nicknameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = nicknameForm.querySelector("input");
  socket.send(makeObject("nickname", input.value));
  input.value = "";
});
