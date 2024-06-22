import PersonaRepo from '@src/repos/PersonaRepo';
import { IPersona } from '@src/models/Persona';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { IComida } from '@src/models/Comida';
import{personaModel} from '@src/repos/Mongoose';


// **** Variables **** //

export const PERSONA_NOT_FOUND_ERR = 'Persona not found';


// **** Functions **** //
/*async function sumarCalorias(id : number): Promise<number> {
  try {
    const personaFromDB = await PersonaRepo.getPersonaById(id);
    return personaFromDB.comidasHechas.reduce((acc, comida) => acc + comida.calorias, 0);
  } catch (err) {
    console.error(err.message);
    return 0;
  }
}*/
/*async function sumarCalorias(id: number): Promise<number> {
  try {
    const personaFromDB = await PersonaRepo.getPersonaById(id);
    
    console.log("Persona from DB");
    console.log(personaFromDB);
    console.log("ID", personaFromDB.id);
    console.log("Nombre", personaFromDB.nombre);
    console.log("Comidas hechas", personaFromDB.comidasHechas);

    const persona = JSON.parse(JSON.stringify(personaFromDB));
    console.log("Comidas hechas", persona.comidasHechas);


    if (!personaFromDB) {
      throw new Error('Persona not found');
    }
    
    if (!personaFromDB.comidasHechas || !Array.isArray(personaFromDB.comidasHechas)) {
      throw new Error('comidasHechas is undefined or not an array');
    }

    return persona.comidasHechas.reduce((acc: any, comida: { calorias: any; }) => acc + comida.calorias, 0);
  } catch (err) {
    console.error(err.message);
    return 0;
  }
}*/
async function sumarCalorias(id: number): Promise<number> {
  try {
    const personaFromDB = await PersonaRepo.getPersonaById(id);
    if (!personaFromDB) {
      throw new Error('Persona not found');
    }
    // Clonar el objeto para asegurar que estamos trabajando con un objeto plano
    const persona = JSON.parse(JSON.stringify(personaFromDB));

    if (!persona.comidasHechas) {
      console.warn('comidasHechas is undefined, assuming empty array');
      persona.comidasHechas = [];  // Proporciona un valor predeterminado vacío
    }

    if (!Array.isArray(persona.comidasHechas)) {
      throw new Error('comidasHechas is not an array');
    }


    const totalCalorias = persona.comidasHechas.reduce((acc: any, comida: { calorias: any; nombre: any; }) => {
      //console.log(`Sumando calorías: ${acc} + ${comida.calorias} (comida: ${comida.nombre})`);
      return acc + comida.calorias;
    }, 0);

    console.log("Total calorías:", totalCalorias);
    return totalCalorias;
  } catch (err) {
    console.error('Error in sumarCalorias:', err.message);
    return 0;
  }
}

async function agregarComida(id: number, comidaId: number): Promise<void> {
  const personaFromDB = await PersonaRepo.getPersonaById(id);
  const comida = await PersonaRepo.getComidaById(comidaId);
  const persona = JSON.parse(JSON.stringify(personaFromDB));
  persona.comidasHechas.push(comida);
  console.log("Comidas hechas incluyendo agregada", persona.comidasHechas);
  await PersonaRepo.update(persona);
}

async function getComidas(id: number): Promise<IComida[]> {
  const personaFromDB = await PersonaRepo.getPersonaById(id);
  const persona = JSON.parse(JSON.stringify(personaFromDB));
  return persona.comidasHechas;
}

async function BorrarComidas(id: number): Promise<void> {
  const persona = await PersonaRepo.getPersonaById(id);
  persona.comidasHechas = [];
  await PersonaRepo.update(persona);
}
async function BorrarUltimaComida(id: number): Promise<void> {
  const persona = await PersonaRepo.getPersonaById(id);
  persona.comidasHechas.pop();
  await PersonaRepo.update(persona);
}
async function BorrarComidaPorId(id: number, comidaId: number): Promise<void> {
  const personaFromDB = await PersonaRepo.getPersonaById(id);
  const persona = JSON.parse(JSON.stringify(personaFromDB));
  const index = persona.comidasHechas.findIndex((comida: { id: number; }) => comida.id === comidaId);
  persona.comidasHechas.splice(index, 1);
  console.log("Borrando comida con id", comidaId);
  await PersonaRepo.update(persona);
}
/**
 * Get all personas.
 */
function getAll(): Promise<IPersona[]> {
  return PersonaRepo.getAll();
}

/**
 * Add one persona.
 */
function addOne(persona: IPersona): Promise<void> {
  return PersonaRepo.add(persona);
}

/**
 * Update one persona.
 */
async function updateOne(persona: IPersona): Promise<void> {
  const persists = await PersonaRepo.persists(persona.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONA_NOT_FOUND_ERR,
    );
  }
  // Return persona
  return PersonaRepo.update(persona);
}

/**
 * Delete a persona by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await PersonaRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      PERSONA_NOT_FOUND_ERR,
    );
  }
  // Delete persona
  return PersonaRepo.delete(id);
}


// **** Export default **** //

export default {
  sumarCalorias,
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  agregarComida,
  getComidas,
  BorrarComidas,
  BorrarUltimaComida,
  BorrarComidaPorId,


} as const;
