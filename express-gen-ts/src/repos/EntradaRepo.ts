import { getRandomInt } from "@src/util/misc";
import orm from "./MockOrm";
import { IFestival } from "@src/models/Festival";
import { IEntrada } from "@src/models/Entrada";
import { festivalModel } from "./Mongoose";

// **** Functions **** //

/**
 * See if a user with the given id exists.
 */

async function persists(festival: IFestival, id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const festival of db.festivales) {
    if (festival.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Add one user.
 */
async function add(idFestival: number, entrada: IEntrada): Promise<void> {
  festivalModel
    .findOneAndUpdate(
      { id: idFestival }, // Example document ID
      { $push: { entradas: entrada } },
      { new: true }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // const db = await orm.openDb();
  // entrada.id = getRandomInt();
  // for (const festival of db.festivales) {
  //   if (festival.id === idFestival) {
  //     festival.entradas.push(entrada);
  //   }
  // }
  // return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(idFestival: number, entrada: IEntrada): Promise<void> {
  festivalModel
    .findOneAndUpdate(
      { id: idFestival }, // Example document ID
      { $set: { "entradas.$[element]": entrada } },
      {
        arrayFilters: [{ "element.id": entrada.id }],
        new: true,
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // const db = await orm.openDb();
  // for (const festival of db.festivales) {
  //   if (festival.id === idFestival) {
  //     for (let i = 0; i < festival.entradas.length; i++) {
  //       if (festival.entradas[i].id === entrada.id) {
  //         const dbArtistas = festival.entradas[i];
  //         festival.entradas[i] = {
  //           ...dbArtistas,
  //           precio: entrada.precio,
  //           tipo: entrada.tipo,
  //         };
  //         return orm.saveDb(db);
  //       }
  //     }
  //   }
  // }
}

/**
 * Delete one user.
 */
async function delete_(idFestival: number, idEntrada: number): Promise<void> {
  festivalModel
    .findOneAndUpdate(
      { id: idFestival }, // Example document ID
      { $pull: { artistas: { id: idEntrada } } },
      { new: true }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  // const db = await orm.openDb();
  // for (const festival of db.festivales) {
  //   if (festival.id === idFestival) {
  //     for (let i = 0; i < festival.entradas.length; i++) {
  //       if (festival.entradas[i].id === idArtista) {
  //         festival.entradas.splice(i, 1);
  //         return orm.saveDb(db);
  //       }
  //     }
  //   }
  //   return orm.saveDb(db);
  // }
}

// **** Export default **** //

export default {
  persists,
  add,
  update,
  delete: delete_,
} as const;
