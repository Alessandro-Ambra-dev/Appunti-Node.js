import * as fs from "node:fs/promises";
try {
  const data = await Promise.all([
    fs.readFile("file1.txt", { encoding: "utf-8" }),
    fs.readFile("file2.txt", { encoding: "utf-8" }),
    fs.readFile("file3.txt", { encoding: "utf-8" }),
  ]);

  console.log("data:", data);
} catch (error) {
  console.log(error);
}
