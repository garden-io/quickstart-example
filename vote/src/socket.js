import { reactive } from "vue";
import { io } from "socket.io-client";

export const socket = io();

socket.on("connect", () => {
    console.log("Connected websocket")
  state.connected = true;
});

socket.on("connect_error", (err) => {
    console.log("Failed websocket", err)
  state.connected = true;
});
  
socket.on("disconnect", () => {
    console.log("Disconnected websocket")
  state.connected = false;
});

socket.on('scores', (json) => {
  const data = JSON.parse(json);
  const a = parseInt(data.a || 0, 10);
  const b = parseInt(data.b || 0, 10);

  state.votes.a = a
  state.votes.b = b
});

export const state = reactive({
  connected: false,
  votes: {
    a: 0,
    b: 0
  }
});
