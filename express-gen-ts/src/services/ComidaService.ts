import ComidaRepo from '@src/repos/ComidaRepo';
import { IComida } from '@src/models/Comida';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { get } from 'http';


// **** Variables **** //

export const COMIDA_NOT_FOUND_ERR = 'Comida not found';





/**
 * Get all comidas.
 */
function getAll(): Promise<IComida[]> {
  return ComidaRepo.getAll();
}

async function getOneComida(id: number): Promise<IComida | null> {
  const persists = await ComidaRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COMIDA_NOT_FOUND_ERR,
    );
  }
  return ComidaRepo.getOneComida(id);
}

/**
 * Add one comida.
 */
function addOne(comida: IComida): Promise<void> {
  return ComidaRepo.add(comida);
}

/**
 * Update one comida.
 */
async function updateOne(comida: IComida): Promise<void> {
  const persists = await ComidaRepo.persists(comida.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COMIDA_NOT_FOUND_ERR,
    );
  }
  // Return comida
  return ComidaRepo.update(comida);
}

/**
 * Delete a comida by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await ComidaRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      COMIDA_NOT_FOUND_ERR,
    );
  }
  // Delete comida
  return ComidaRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  addOne,
  updateOne,
  delete: _delete,
  getOneComida,
} as const;
