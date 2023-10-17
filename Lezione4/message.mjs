import clc from "cli-color";

function outputMessage(message) {
  console.log(clc.green(`The message is: ${message}`));
}

outputMessage("Hey,Hey!");
