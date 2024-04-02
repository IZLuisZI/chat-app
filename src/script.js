import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

// Variables
let textarea = document.getElementById("message");
let inputText = document.getElementById("input-text");
let submitButton = document.getElementById("send-button");
let messageForm = document.getElementById("show-message");
let roomForm = document.getElementById("room-form-id");
let inputUsername = document.getElementById("input-user");
let submitUsername = document.getElementById("send-user-button");
let formUsername = document.getElementById("user-form-id");
let roomInput = document.getElementById("input-room");
let username;

// set inital state

textarea.style.cursor = "not-allowed";
textarea.style.opacity = "0.5";
messageForm.style.visibility = "hidden";
roomForm.style.visibility = "hidden";

// Socket initialization
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayMessage({ username: "Server", message: "Connected to server" });
  displayMessage({
    username: "Server",
    message: "your id is: " + socket.id,
  });
});

socket.on("disconnect", () => {
  displayMessage({ username: "Server", message: "Disconnected from server" });
});

// Event listeners
submitUsername.addEventListener("click", (event) => {
  event.preventDefault();
  username = inputUsername.value;
  if (username.trim() === "") {
    alert("Please enter a room id or create one by typing a name");
    roomInput.style.backgroundColor = "red";
    return;
  }
  socket.emit("username", username);
  inputUsername.value = "";
  textarea.style.cursor = "auto";
  textarea.style.opacity = "1";
  formUsername.style.display = "none";
  messageForm.style.visibility = "visible";
  roomForm.style.visibility = "visible";
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  /**
   * The message variable stores the value of the input text.
   * @type {string}
   */
  const message = inputText.value;
  const room = roomInput.value;
  if (message.trim() !== "") {
    if (room === "") {
      roomInput.style.backgroundColor = "red";
      alert("Please enter a room");

      return;
    }
    socket.emit("send", { username, message }, room);
    displayMessage({ username, message });
    inputText.value = "";
  }
});

roomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  /**
   * Represents the current room.
   * @type {string}
   */
  const room = roomInput.value;
  socket.emit("join-room", room);
  roomInput.style.backgroundColor = "lightgreen";
  if (room.trim() === "") {
    roomInput.style.backgroundColor = "white";
  }
});

// Socket event listeners
socket.on("receive", (message) => {
  displayMessage(message);
});

// Functions
/**
 * Displays a message in the textarea.
 *
 * @param {Object} data - The data object containing the username and message.
 */
function displayMessage(data) {
  let displayMessage = textarea.appendChild(document.createElement("div"));
  displayMessage.classList.add("user");
  displayMessage.textContent = `${data.username}: ${data.message}`;
}

/**
 * Scrolls to the bottom of the textarea if the user is already at the bottom.
 */
function scrollOnMessage() {
  // Check if the user is at the bottom of the textarea
  if (textarea.scrollTop + textarea.clientHeight === textarea.scrollHeight) {
    textarea.scrollTop = textarea.scrollHeight;
  }
}

// Interval
const scrollInterval = setInterval(scrollOnMessage, 100);

// Stop the function if the user scrolls up
textarea.addEventListener("scroll", () => {
  clearInterval(scrollInterval);
});
