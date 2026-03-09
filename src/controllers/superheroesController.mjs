import {
  obtenerTodosLosSuperheroes,
  obtenerSuperheroePorNombre,
  buscarSuperheroesPorPlaneta,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe
} from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function getAllSuperHeroesController(req, res) {
  const heroes = await obtenerTodosLosSuperheroes();
  res.json(renderizarListaSuperheroes(heroes));
}

export async function getSuperHeroByNameController(req, res) {
  const { nombre } = req.params;
  const hero = await obtenerSuperheroePorNombre(nombre);
  if (!hero) {
    return res.status(404).json({ error: 'Superhéroe no encontrado' });
  }
  res.json(renderizarSuperheroe(hero));
}

export async function findSuperHeroesController(req, res) {
  const { planetaOrigen } = req.query;
  const heroes = await buscarSuperheroesPorPlaneta(planetaOrigen || 'Tierra');
  res.json(renderizarListaSuperheroes(heroes));
}

export async function insertSuperHeroController(req, res) {
  const hero = await crearSuperheroe(req.body);
  res.status(201).json(renderizarSuperheroe(hero));
}

export async function updateSuperHeroController(req, res) {
  const { nombre } = req.params;
  const result = await actualizarSuperheroe(nombre, req.body);
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'Superhéroe no encontrado' });
  }
  res.json({ mensaje: 'Superhéroe actualizado', resultado: result });
}

export async function deleteSuperHeroController(req, res) {
  const { nombre } = req.params;
  const result = await eliminarSuperheroe(nombre);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Superhéroe no encontrado' });
  }
  res.json({ mensaje: 'Superhéroe eliminado', resultado: result });
}
