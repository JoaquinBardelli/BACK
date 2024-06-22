//import moment from 'moment';

// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';


// **** Types **** //

export interface IComida {
  id: number;
  nombre: string;
  calorias: number;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  nombre?: string,
  calorias?: number,
  id?: number, // id last cause usually set by db
): IComida {
  return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    calorias: (calorias ?? 0),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IComida {
  if (!isComida(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IComida;
  return new_(p.nombre, p.calorias, p.id);
}

/**
 * See if the param meets criteria to be a user.
 */
function isComida(arg: any): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg && typeof arg.id === 'number' && 
    'nombre' in arg && typeof arg.nombre === 'string' && 
    'calorias' in arg && typeof arg.calorias === 'number'
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isComida,
} as const;
