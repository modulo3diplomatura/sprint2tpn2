import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
  async obtenerTodos() {
    return await SuperHero.find();
  }

  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerPorNombre(nombreSuperHeroe) {
    return await SuperHero.findOne({ nombreSuperHeroe });
  }

  async buscarPorPlaneta(planetaOrigen) {
    return await SuperHero.find({ planetaOrigen });
  }

  async crear(datos) {
    const hero = new SuperHero(datos);
    return await hero.save();
  }

  async actualizar(nombreSuperHeroe, datosActualizados) {
    return await SuperHero.updateOne(
      { nombreSuperHeroe },
      { $set: datosActualizados }
    );
  }

  async eliminar(nombreSuperHeroe) {
    return await SuperHero.deleteOne({ nombreSuperHeroe });
  }
}

export default SuperHeroRepository;
