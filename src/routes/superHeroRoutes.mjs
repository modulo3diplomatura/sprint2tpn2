import { Router } from 'express';
import {
  getAllSuperHeroesController,
  getSuperHeroByNameController,
  findSuperHeroesController,
  insertSuperHeroController,
  updateSuperHeroController,
  deleteSuperHeroController
} from '../controllers/superheroesController.mjs';

const router = Router();

// GET /api/heroes - Obtener todos los superhéroes
router.get('/', getAllSuperHeroesController);

// GET /api/heroes/buscar?planetaOrigen=Tierra - Buscar por planeta
router.get('/buscar', findSuperHeroesController);

// GET /api/heroes/:nombre - Obtener un superhéroe por nombre
router.get('/:nombre', getSuperHeroByNameController);

// POST /api/heroes - Insertar un nuevo superhéroe
router.post('/', insertSuperHeroController);

// PUT /api/heroes/:nombre - Actualizar un superhéroe por nombre
router.put('/:nombre', updateSuperHeroController);

// DELETE /api/heroes/:nombre - Eliminar un superhéroe por nombre
router.delete('/:nombre', deleteSuperHeroController);

export default router;
