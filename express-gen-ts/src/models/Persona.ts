//import moment from 'moment';
import { IComida } from './Comida';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IPersona {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  comidasHechas: IComida[];
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  nombre?: string,
  apellido?: string,
  email?: string,
  comidasHechas: IComida[] = [],
  id?: number, // id last cause usually set by db
): IPersona {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    apellido: (apellido ?? ''),
    email: (email ?? ''),
    comidasHechas: Array.from(comidasHechas),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IPersona {
  if (!isPersona(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IPersona;
  return new_(p.nombre, p.apellido, p.email, p.comidasHechas , p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isPersona(arg: unknown): boolean {
    return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'nombre' in arg && typeof arg.nombre === 'string' && 
    'apellido' in arg && typeof arg.apellido === 'string' &&
    'email' in arg && typeof arg.email === 'string' &&
    'comidasHechas' in arg && typeof arg.comidasHechas === 'object'
    );
    
}
/*function isPersona(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'nombre' in arg && typeof arg.nombre === 'string' && 
    'apellido' in arg && typeof arg.apellido === 'string' &&
    'email' in arg && typeof arg.email === 'string' &&
    'comidasHechas' in arg && typeof arg.comidasHechas === 'Set<string>'
  );
}*/



// **** Export default **** //

export default {
  new: new_,
  from,
  isPersona,
} as const;


