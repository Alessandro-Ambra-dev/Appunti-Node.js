import { error } from "console";
import { createReadStream } from "fs";

const file = createReadStream("file4.txt", { encoding: "utf-8" });

file.on("data", (chunk) => {
  console.log("chunk:", chunk.toString("utf8"));
});

file.on("end", () => console.error("end of file read stream"));

file.on("error", (error) => console.error(`error reading file:${error}`));
