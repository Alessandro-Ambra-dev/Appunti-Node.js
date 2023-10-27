import express, { response } from "express";
import "express-async-errors";
import { request } from "http";
import morgan from "morgan";
import { type } from "os";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets.js";
const app = express();
const port = 3000;

app
  .use(morgan("dev"))
  .use(express.json())
  .get("/api/planets", getAll)
  .get("/api/planets/:id", getOneById)
  .post("/api/planets", create)
  .put("/api/planets/:id", updateById)
  .delete("/api/planets/:id", deleteById)
  .listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
