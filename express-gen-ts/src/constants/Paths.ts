/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Personas: {
    Base: '/personas',
    GetPersona: '/all',
    AddPersona: '/add',
    UpdatePersona: '/update',
    DeletePersona: '/delete/:id',
    Sumar: '/:id/sumar-calorias',
    GetComidas: '/:id/comidas',
    /*bORRAR TODO, ULTIMA Y BORAR POR ID*/
    BorrarComidas: '/:id/borrar-comidas',
    BorrarUltimaComida: '/:id/borrar-ultima-comida',
    BorrarComidaPorId: '/:id/borrar-comida/:comidaId',
    AgregarComida: '/:id/agregar-comida/:comidaId',
  },
  Comidas: {
    Base: '/comidas',
    GetComida: '/all',
    GetOneComida: '/get/:id',
    AddComida: '/add',
    UpdateComida: '/update',
    DeleteComida: '/delete/:id',
  }
} as const;
