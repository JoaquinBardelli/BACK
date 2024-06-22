import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import PersonaService from '@src/services/PersonaService';
import { IPersona } from '@src/models/Persona';
import { IReq, IRes } from './types/express/misc';


// **** Functions **** //

async function sumarCalorias(_: IReq<{id : number}>, res: IRes){
  const id = +_.params.id;
  const calorias = await PersonaService.sumarCalorias(id);
  return res.status(HttpStatusCodes.OK).json({ calorias });
}

async function agregarComida(req: IReq<{id: number, comidaId: number}>, res: IRes){
  const id = Number(req.params.id);
  const comidaId = Number(req.params.comidaId);
  console.log("ID de la comida agregada", comidaId);
  await PersonaService.agregarComida(id, comidaId);
  return res.status(HttpStatusCodes.OK).end();
} 

async function getComidas( _: IReq<{id: number}>, res: IRes){
  const id = Number(_.params.id);
  const comidas = await PersonaService.getComidas(id);
  return res.status(HttpStatusCodes.OK).json({ comidas });
  
}

async function BorrarComidas(req: IReq<{id: number}>, res: IRes){
  const id = Number(req.params.id);
  await PersonaService.BorrarComidas(id);
  return res.status(HttpStatusCodes.OK).end();
}

async function BorrarUltimaComida(req: IReq<{id: number}>, res: IRes){
  const id = Number(req.params.id);
  await PersonaService.BorrarUltimaComida(id);
  return res.status(HttpStatusCodes.OK).end();
}

async function BorrarComidaPorId(req: IReq<{id: number, comidaId: number}>, res: IRes){
  const id = Number(req.params.id);
  const comidaId = Number(req.params.comidaId);
  await PersonaService.BorrarComidaPorId(id, comidaId);
  return res.status(HttpStatusCodes.OK).end();
}


/**
 * Get all personas.
 */
async function getAll(_: IReq, res: IRes) {
  const personas = await PersonaService.getAll();
  return res.status(HttpStatusCodes.OK).json({ personas });
}

/**
 * Add one persona.
 */
async function add(req: IReq<{persona: IPersona}>, res: IRes) {
  const { persona } = req.body;
  await PersonaService.addOne(persona);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one persona.
 */
async function update(req: IReq<{persona: IPersona}>, res: IRes) {
  const { persona } = req.body;
  await PersonaService.updateOne(persona);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one persona.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await PersonaService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  sumarCalorias,
  getAll,
  add,
  update,
  delete: delete_,
  agregarComida,
  getComidas,
  BorrarComidas,
  BorrarUltimaComida,
  BorrarComidaPorId,
} as const;
