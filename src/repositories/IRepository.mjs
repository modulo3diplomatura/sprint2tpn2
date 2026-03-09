class IRepository {
  async obtenerTodos() {
    throw new Error('Método obtenerTodos() no implementado');
  }

  async obtenerPorId(id) {
    throw new Error('Método obtenerPorId() no implementado');
  }

  async crear(datos) {
    throw new Error('Método crear() no implementado');
  }

  async actualizar(id, datos) {
    throw new Error('Método actualizar() no implementado');
  }

  async eliminar(id) {
    throw new Error('Método eliminar() no implementado');
  }
}

export default IRepository;
