export function renderizarSuperheroe(hero) {
  if (!hero) return null;
  return {
    id: hero._id,
    nombreSuperHeroe: hero.nombreSuperHeroe,
    nombreReal: hero.nombreReal,
    edad: hero.edad,
    planetaOrigen: hero.planetaOrigen,
    debilidad: hero.debilidad,
    poderes: hero.poderes,
    aliados: hero.aliados,
    enemigos: hero.enemigos,
    creador: hero.creador,
    createdAt: hero.createdAt
  };
}

export function renderizarListaSuperheroes(heroes) {
  if (!heroes || heroes.length === 0) {
    return { mensaje: 'No se encontraron superhéroes', datos: [] };
  }
  return {
    cantidad: heroes.length,
    datos: heroes.map(hero => renderizarSuperheroe(hero))
  };
}
