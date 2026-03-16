import express from "express";
import mongoose from "mongoose";
import dns from "dns";
// Forzar servidores DNS: Google y Cloudflare
dns.setServers(["8.8.8.8", "1.1.1.1"]);
// Pilar principal de la programación de software: Separación de responsabilidades
// 1. Servidor: Encargado de manejar las solicitudes HTTP, rutas, respuestas, etc.
// 2. Base de datos: Encargada de almacenar y gestionar los datos de la aplicación.
// 3. Lógica de negocio: Encargada de procesar los datos, aplicar reglas de negocio, etc.
const app = express();
const PORT = 3000;
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://augustodelcampo97:Nodotecnologico@cluster0.nxsrd.mongodb.net/dbsuperheroes",
    );
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}
const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: "Desconocido" },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String,
  },
  { collection: "dbsuperheroes" },
);
// Se crea un modelo de Mongoose llamado "SuperHero" basado en el esquema definido anteriormente.
const SuperHero = mongoose.model("SuperHero", superheroSchema);

// Funciones de acceso a datos
async function obtenerTodos() {
  return await SuperHero.find();
}
async function obtenerPorNombre(nombreSuperHeroe) {
  return await SuperHero.findOne({ nombreSuperHeroe });
}
async function buscarPorPlaneta(planetaOrigen) {
  return await SuperHero.find({ planetaOrigen });
}

// Petición sin parámetros ni query
// Se hace la petición a la ruta "/superheroes" y se obtiene la lista de todos los superhéroes
// almacenados en la base de datos utilizando la función obtenerTodos()
// y se devuelve como respuesta en formato JSON.
app.get("/superheroes", async (req, res) => {
  const heroes = await obtenerTodos();
  res.json(heroes);
});
// Petición con query string (planetaOrigen) que se extrae de la URL utilizando req.query.planetaOrigen
// Se hace la petición a la ruta "/superheroes/buscar" con un query string que especifica
// el planeta de origen de los superhéroes que se desean buscar.
// La función buscarPorPlaneta() obtiene una lista de superhéroes que coinciden con el planeta
// de origen especificado en el query string, y se devuelve como respuesta en formato JSON.
// IMPORTANTE: Esta ruta debe ir ANTES de "/superheroes/:nombre" para que Express no la confunda
// con un parámetro dinámico. Ejemplo de uso:  http://localhost:3000/superheroes/buscar?planetaOrigen=Tierra
app.get("/superheroes/buscar", async (req, res) => {
  const planetaOrigen = req.query.planetaOrigen;
  const heroes = await buscarPorPlaneta(planetaOrigen || "Tierra");
  res.json(heroes);
});
// Petición con parámetro dinámico (:nombre) que se extrae de la URL utilizando req.params.nombre
// Se hace la petición a la ruta "/superheroes/:nombre" y se obtiene un superhéroe específico
// basado en su nombre utilizando la función obtenerPorNombre()
// y se devuelve como respuesta en formato JSON.
app.get("/superheroes/:nombre", async (req, res) => {
  const nombre = req.params.nombre;
  console.log("nombre", nombre);
  const hero = await obtenerPorNombre(nombre);
  res.json(hero);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
