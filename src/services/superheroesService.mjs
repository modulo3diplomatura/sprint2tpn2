import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

const repository = new SuperHeroRepository();

export async function obtenerTodosLosSuperheroes() {
  return await repository.obtenerTodos();
}

export async function obtenerSuperheroePorNombre(nombreSuperHeroe) {
  return await repository.obtenerPorNombre(nombreSuperHeroe);
}

export async function buscarSuperheroesPorPlaneta(planetaOrigen) {
  return await repository.buscarPorPlaneta(planetaOrigen);
}

export async function crearSuperheroe(datos) {
  return await repository.crear(datos);
}

export async function actualizarSuperheroe(nombreSuperHeroe, datosActualizados) {
  return await repository.actualizar(nombreSuperHeroe, datosActualizados);
}

export async function eliminarSuperheroe(nombreSuperHeroe) {
  return await repository.eliminar(nombreSuperHeroe);
}
