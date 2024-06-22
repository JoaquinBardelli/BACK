import { IComida } from '@src/models/Comida';
import { getRandomInt } from '@src/util/misc';
import orm, { comidaModel } from './Mongoose';

// **** Functions **** //

/**
 * make a function that gets a comida by an id and returns it to the angular app
*/
async function getComidaById(id: number): Promise<IComida> {
  const db = await orm.openDbComidas();
  for (const comida of db.comidas) {
    if (comida.id === id) {
      return comida;
    }
  }
  throw new Error('Comida not found');
}

/**
 * Get one comida.
 */
async function getOne(id: number): Promise<IComida | null> {
  const db = await orm.openDbComidas();
  for (const comida of db.comidas) {
    if (comida.id === id) {
      return comida;
    }
  }
  return null;
}

/**
 * See if a comida with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDbComidas();
  for (const comida of db.comidas) {
    if (comida.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all comidas.
 */
async function getAll(): Promise<IComida[]> {
  const db = await orm.openDbComidas();
  console.log("Resultado: ", db);
  return db;
}

async function getOneComida(id: number): Promise<IComida | null> {
  const db = await orm.openDbComidas();
  for (const comida of db.comidas) {
    if (comida.id === id) {
      return comida;
    }
  }
  return null;
}

/**
 * Add one comida.
 */
async function add(comida: IComida): Promise<void> {
  /*const db = await orm.openDbComidas();
  comida.id = getRandomInt();
  db.comidas.push(comida);
  return orm.saveDbComidas(db);*/
  comidaModel
  .insertMany(comida)
  .then(() => {
    console.log("Comida agregada");
  })
  .catch((err: any) => {
    console.error(err);
  });
}

/**
 * Update a comida.
 */
async function update(comida: IComida): Promise<void> {
  /*const db = await orm.openDbComidas();
  for (let i = 0; i < db.comidas.length; i++) {
    if (db.comidas[i].id === comida.id) {
      const dbComida = db.comidas[i];
      db.comidas[i] = {
        ...dbComida,
        nombre: comida.nombre,
        calorias: comida.calorias,
        
      };
      return orm.saveDbComidas(db);
    }*/
    comidaModel
    .replaceOne({id: comida.id}, comida)
    .then(() => {
      console.log("Comida actualizada");
    })
    .catch((err: any) => {
      console.error(err);
    });
}

/**
 * Delete one comida.
 */
async function delete_(id: number): Promise<void> {
  /*const db = await orm.openDb();
  for (let i = 0; i < db.comidas.length; i++) {
    if (db.comidas[i].id === id) {
      db.comidas.splice(i, 1);
      return orm.saveDb(db);
    }
  }*/
  comidaModel
    .deleteOne({id: id})
    .then(() => {
      console.log("Comida eliminada");
    })
    .catch((err: any) => {
      console.error(err);
    });
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  getComidaById,
  getOneComida,  
} as const;
