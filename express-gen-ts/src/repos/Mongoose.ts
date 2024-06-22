import jsonfile from "jsonfile";

import { IPersona } from "@src/models/Persona";

import Mongoose, { Connection, Model, Schema } from "mongoose";
import { IComida } from "@src/models/Comida";
import { Console } from "console";
import exp from "constants";
import e from "cors";

// **** Variables **** //

// **** Types **** //

const personaSchema: Schema = new Mongoose.Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    comidasHechas: [
      {
        id: Number,
        nombre: String,
        calorias: Number,
      },
    ],
  },
  { collection: "personas", versionKey: false }
);

const comidaSchema: Schema = new Mongoose.Schema(
  {
    id: { type: Number, required: true },
    nombre: { type: String, required: true },
    calorias: { type: Number, required: true },
  },
  { collection: "comidas", versionKey: false }
);

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
const db: Connection = Mongoose.createConnection(
  "mongodb://localhost:27017/tp"
);

export const personaModel = db.model<IPersona>("personas", personaSchema);
export const comidaModel = db.model<IComida>("comidas", comidaSchema);

//HACER QUE HAYA UNA FUNCION QUE ABRA LA COLECCION COMIDAAS Y OTRA PERSONAS

function openDbPersonas(): Promise<any> {
  return new Promise((resolve, reject) => {
    personaModel
      .find({})
      .then((data: any) => {
        resolve(data);
        console.log("Funciono");})
      .catch((error: Error) => {
        console.error("Error al obtener personas:", error);
        reject(error);
      });
  });
}


function saveDbPersonas(db: IPersona[]): Promise<void> {
  return new Promise((resolve, reject) => {
    personaModel
      .deleteMany({})
      .then()
      .catch((err: any) => {
        console.error("Error al eliminar documentos de la colección:", err);
        reject(err);
      });
    personaModel
      .insertMany(db)
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.error(err);
        reject(err);
      });
  });
}

function openDbComidas(): Promise<any> {
  return new Promise((resolve, reject) => {
    comidaModel
      .find({})
      .then((data: any) => {
        resolve(data);
        console.log(data);
        console.log("Funciono");})
      .catch((error: Error) => {
        console.error("Error al obtener personas:", error);
        reject(error);
      });
  });
}

function saveDbComidas(db: IComida[]): Promise<void> {
  return new Promise((resolve, reject) => {
    comidaModel
      .deleteMany({})
      .then()
      .catch((err: any) => {
        console.error("Error al eliminar documentos de la colección:", err);
        reject(err);
      });
    console.log(db);
    comidaModel
      .insertMany(db)
      .then(() => {
        resolve();
      })
      .catch((err: any) => {
        console.error(err);
        reject(err);
      });
  });
}


export default {
  openDbPersonas,
  saveDbPersonas,
  openDbComidas,
  saveDbComidas,
} as const;
