import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres");
const setUpDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
   id SERIAL PRIMARY KEY,
   name TEXT NOT NULL
  );
`);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Jupiter')`);
  await db.none(`INSERT INTO planets (name) VALUES ($1)`, String(iterateGen()));
};

const updateDb = async () => {
  await setUpDb();
  await iterateGen();
  const names = await db.many(`SELECT name FROM planets`);
  console.log(names);
};

updateDb();

function iterateGen() {
  for (let i = 0; i < 100; i++) {
    return generateString(10);
  }
}

function generateString(lun: number) {
  let str1 = "";
  let str2 = "asdfghjklo";
  for (let i = 0; i < lun; i++) {
    let strLength = Math.floor(Math.random() * str2.length);
    str1 += str2.substring(strLength, strLength + 1);
  }
  return str1;
}

const getAll = async (request: Request, response: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
  response.status(200).json(planets);
};

const getOneById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1`,
    Number(id)
  );
  response.status(200).json(planet);
};

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

const create = (request: Request, response: Response) => {
  const { id, name } = request.body;
  const newPlanet = { id, name };

  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return response.status(400).json({
      message: validateNewPlanet.error.details[0].message,
    });
  } else {
    planets = [...planets, newPlanet];
    response.status(201).json({ message: "The planet was created" });
  }
};

const updateById = (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  response.status(200).json({ message: "The planet was updated" });
};

const deleteById = (request: Request, response: Response) => {
  const { id } = request.params;
  planets = planets.filter((p) => p.id !== Number(id));

  response.status(200).json({ message: "The planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
