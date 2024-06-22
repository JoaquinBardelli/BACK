import { IPersona } from '@src/models/Persona';
import { getRandomInt } from '@src/util/misc';
import orm from "./Mongoose";
import { IComida } from '@src/models/Comida';
import { personaModel } from "./Mongoose";




// **** Functions **** //

/**
 * make a function that gets a persona by an id and returns it to the angular app
*/
async function getPersonaById(id: number): Promise<IPersona> {
  const db = await orm.openDbPersonas();
  console.log(db);
  for (const persona of db) {
    if (persona.id === id) {
      return persona;
    }
  }
  throw new Error('Persona not found');
}

async function getComidaById(id: number): Promise<IComida> {
  const db = await orm.openDbComidas();
  for (const comida of db) {
    if (comida.id === id) {
      console.log("Comida encontrada", comida);
      return comida;
    }
  }
  throw new Error('Comida not found');
}

/**
 * Get one persona.
 */
async function getOne(email: string): Promise<IPersona | null> {
  const db = await orm.openDbPersonas();
  for (const persona of db) {
    if (persona.email === email) {
      return persona;
    }
  }
  return null;
}

/**
 * See if a persona with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDbPersonas();
  for (const persona of db) {
    if (persona.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all personas.
 */
async function getAll(): Promise<IPersona[]> {
  const db = await orm.openDbPersonas();
  return db[0];
}

/**
 * Add one persona.
 */
async function add(persona: IPersona): Promise<void> {
  //const db = await orm.openDb();
  //const db = await orm.openDb();
  persona.id = getRandomInt();
  personaModel
  .insertMany(persona)
  .then((res) => {console.log(res);})
  .catch((err) => {console.error(err);});

  //db.personas.push(persona);
  //return orm.saveDb(db);
  personaModel
  .insertMany(persona)
  .then((res) => {console.log(res);})
  .catch((err) => {console.error(err);});

  //db.personas.push(persona);
  //return orm.saveDb(db);
}

/**
 * Update a persona.
 */
async function update(persona: IPersona): Promise<void> {
  //const db = await orm.openDb();
  console.log("Actualizando persona", persona);
  console.log("Comidas hechas", persona.comidasHechas);
  const personaFromDB = await personaModel.findOne({id: persona.id});
  console.log("Persona from DB", personaFromDB);
  personaModel
    .updateOne({id: persona.id}, persona)
    .then((res) => {console.log(res);})
    .catch((err) => {console.error(err);});
  /*personaModel.updateOne(
    { id: persona.id },
    { $set: { comidasHechas: persona.comidasHechas } }
  );*/
  /*personaModel
    .replaceOne({id: persona.id}, persona)
    .then((res) => {console.log(res);})
    .catch((err) => {console.error(err);});
*/

  /*for (let i = 0; i < db.personas.length; i++) {
    if (db.personas[i].id === persona.id) {
      const dbPersona = db.personas[i];
      db.personas[i] = {
        ...dbPersona,
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email,
        comidasHechas: persona.comidasHechas,
      };
      return orm.saveDb(db);
    }
  }*/
  
}

/**
 * Delete one persona.
 */
async function delete_(id: number): Promise<void> {
 // const db = await orm.openDb();
  personaModel
    .deleteOne({id: id})
    .then((res) => {console.log(res);})
    .catch((err) => {console.error(err);});

  /*for (let i = 0; i < db.personas.length; i++) {
 // const db = await orm.openDb();
  personaModel
    .deleteOne({id: id})
    .then((res) => {console.log(res);})
    .catch((err) => {console.error(err);});

  /*for (let i = 0; i < db.personas.length; i++) {
    if (db.personas[i].id === id) {
      db.personas.splice(i, 1);
      return orm.saveDb(db);
    }
  }*/
  
}

async function BorrarComidas(id: number): Promise<void> {
  const db = await orm.openDbPersonas();
  for (let i = 0; i < db.personas.length; i++) {
    if (db.personas[i].id === id) {
      db.personas[i].comidasHechas = [];
      return orm.saveDbPersonas(db);
    }
  }
}

async function BorrarUltimaComida(id: number): Promise<void> {
  const db = await orm.openDbPersonas();
  for (let i = 0; i < db.personas.length; i++) {
    if (db.personas[i].id === id) {
      db.personas[i].comidasHechas.pop();
      return orm.saveDbPersonas(db);
    }
  }
}
/*Borrar todas las comidas con ese ID*/
async function BorrarComidaPorId(id: number, comidaId: number): Promise<void> {
  const db = await orm.openDbPersonas();


  /*for (let i = 0; i < db.personas.length; i++) {
    if (db.personas[i].id === id) {
      for (let j = 0; j < db.personas[i].comidasHechas.length; j++) {
        if (db.personas[i].comidasHechas[j].id === comidaId) {
          const persona = JSON.parse(JSON.stringify(personaFromDB));
          console.log("Borrando comida con id", comidaId);
          db.personas[i].comidasHechas.splice(j, 1);
        }
      }
      return orm.saveDbPersonas(db);
    }
  }*/
} 


// **** Export default **** //

export default {
  getPersonaById,
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  getComidaById,
  BorrarComidas,
  BorrarUltimaComida,
  BorrarComidaPorId,
} as const;
