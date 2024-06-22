import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import ComidaService from '@src/services/ComidaService';
import { IComida } from '@src/models/Comida';
import { IReq, IRes } from './types/express/misc';
import { get } from 'http';


// **** Functions **** //



/**
 * Get all comidas.
 */
async function getAll(_: IReq, res: IRes) {
  const comidas = await ComidaService.getAll();
  return res.status(HttpStatusCodes.OK).json({ comidas });
}

async function getOneComida(req: IReq, res: IRes) {
  const id = +req.params.id;
  const comida = await ComidaService.getOneComida(id);
  return res.status(HttpStatusCodes.OK).json({ comida });
}
/**
 * Add one comida.
 */
async function add(req: IReq<{comida: IComida}>, res: IRes) {
  const { comida } = req.body;
  await ComidaService.addOne(comida);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one comida.
 */
async function update(req: IReq<{comida: IComida}>, res: IRes) {
  const { comida } = req.body;
  await ComidaService.updateOne(comida);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one comida.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await ComidaService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  getAll,
  add,
  update,
  delete: delete_,
  getOneComida,
} as const;
