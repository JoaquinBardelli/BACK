import { IUser } from "@src/models/User";
import { getRandomInt } from "@src/util/misc";
import orm from "./Mongoose";
import { IFestival } from "@src/models/Festival";
import { festivalModel } from "./Mongoose";
// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IFestival | null> {
  const db = await orm.openDb();
  for (const festival of db) {
    if (festival.id === id) {
      return festival;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const festival of db) {
    console.log(festival.id + "==" + id);
    if (festival.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all festivales.
 */
async function getAll(): Promise<IFestival[]> {
  const db = await orm.openDb();
  return db;
}

/**
 * Add one user.
 */
async function add(festival: IFestival): Promise<void> {
  //const db = await orm.openDb();
  festival.id = getRandomInt();
  festivalModel
    .insertMany(festival)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // db.push(festival);
  // return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(festival: IFestival): Promise<void> {
  //const db = await orm.openDb();
  festivalModel
    .replaceOne({ id: festival.id }, festival)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // for (let i = 0; i < db.length; i++) {
  //   if (db[i].id === festival.id) {
  //     const dbFestival = db[i];
  //     db[i] = {
  //       ...dbFestival,
  //       nombre: festival.nombre,
  //       ubicacion: festival.ubicacion,
  //       fechaInicio: festival.fechaInicio,
  //       fechaFin: festival.fechaFin,
  //       artistas: festival.artistas,
  //       capacidadMaxima: festival.capacidadMaxima,
  //       tipoDeMusica: festival.tipoDeMusica,
  //     };
  //     return orm.saveDb(db);
  //   }
  // }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  festivalModel
    .deleteOne({ id: id })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // const db = await orm.openDb();
  // for (let i = 0; i < db.length; i++) {
  //   if (db[i].id === id) {
  //     db.splice(i, 1);
  //     return orm.saveDb(db);
  //   }
  // }
}

// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
