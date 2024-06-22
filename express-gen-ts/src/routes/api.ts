import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Persona from '@src/models/Persona';
import PersonaRoutes from './PersonaRoutes';
import ComidaRoutes from './ComidaRoutes';
import Comida from '@src/models/Comida';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add PersonaRouter ** //

const personaRouter = Router();
const comidaRouter = Router();

personaRouter.post(
  Paths.Personas.AgregarComida,
  PersonaRoutes.agregarComida
);

personaRouter.get(
  Paths.Personas.Sumar,
  validate(['id', 'number', 'params']),
  PersonaRoutes.sumarCalorias,
);

comidaRouter.get(
  Paths.Comidas.GetComida,
  ComidaRoutes.getAll,
);

// Get all personas
personaRouter.get(
  Paths.Personas.GetPersona,
  PersonaRoutes.getAll,
);

// Add one persona
personaRouter.post(
  Paths.Personas.AddPersona,
  validate(['persona', Persona.isPersona]),
  PersonaRoutes.add,
);

personaRouter.get(
  Paths.Personas.GetComidas,
  validate(['id', 'number', 'params']),
  PersonaRoutes.getComidas,
);

personaRouter.delete(
  Paths.Personas.BorrarComidas,
  validate(['id', 'number', 'params']),
  PersonaRoutes.BorrarComidas,
);
personaRouter.delete(
  Paths.Personas.BorrarUltimaComida,
  validate(['id', 'number', 'params']),
  PersonaRoutes.BorrarUltimaComida,
);
personaRouter.delete(
  Paths.Personas.BorrarComidaPorId,
  validate(['id', 'number', 'params']),
  PersonaRoutes.BorrarComidaPorId,
);

comidaRouter.post(
  Paths.Comidas.AddComida,
  validate(['comida', Comida.isComida]),
  ComidaRoutes.add,
); 


// Update one persona
personaRouter.put(
  Paths.Personas.UpdatePersona,
  validate(['persona', Persona.isPersona]),
  PersonaRoutes.update,
);

comidaRouter.put(
  Paths.Comidas.UpdateComida,
  validate(['comida', Comida.isComida]),
  ComidaRoutes.update,
);



// Delete one persona
personaRouter.delete(
  Paths.Personas.DeletePersona,
  validate(['id', 'number', 'params']),
  PersonaRoutes.delete,
);

comidaRouter.delete(
  Paths.Comidas.DeleteComida,
  validate(['id', 'number', 'params']),
  ComidaRoutes.delete,
);

// Add PersonaRouter
apiRouter.use(Paths.Personas.Base, personaRouter);
apiRouter.use(Paths.Comidas.Base, comidaRouter);

// **** Export default **** //

export default apiRouter;
