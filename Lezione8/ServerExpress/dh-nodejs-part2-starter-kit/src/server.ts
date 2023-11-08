import express, { response } from "express";
import "express-async-errors";
import { request } from "http";
import morgan from "morgan";
import { type } from "os";
import multer from "multer";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./controllers/planets";
import { logIn, signUp, logOut } from "./controllers/users";
import authorize from "./authorize";

const app = express();
const port = 3000;
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });

app
  .use("/uploads", express.static("uploads"))
  .use("/static", express.static("static"))
  .use(morgan("dev"))
  .use(express.json())
  .get("/api/planets", getAll)
  .get("/api/planets/:id", getOneById)
  .post("/api/planets", create)
  .post("api/planets/:id/image", upload.single("image"), createImage)
  .put("/api/planets/:id", updateById)
  .delete("/api/planets/:id", deleteById)
  .post("/api/users/login", logIn)
  .post("/api/users/signup", signUp)
  .get("/api/users/logout", authorize, logOut)
  .listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
