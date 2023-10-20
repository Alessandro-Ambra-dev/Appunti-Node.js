import { EventEmitter } from "events";

// EventEmitter instance (subject)
const emitter = new EventEmitter();

//Attach an event listener for the "data" event
emitter.on("data", (data) => {
  console.log(data);
});

//Emit a data event every second
const interval = setInterval(() => {
  emitter.emit("data", "this is some data");
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 10000);
