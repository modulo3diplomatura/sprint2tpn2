import express from "express";
import mongoose from "mongoose";
// ========================
// Conexión a MongoDB
// ========================
async function connectDB() {
  try {
    await mongoose.connect(
// La cadena de conexión a MongoDB Atlas, que incluye el nombre de usuario, la contraseña, el clúster(o servidor) y el nombre de la base de datos.
      "mongodb+srv://augustodelcampo97:Nodotecnologico@cluster0.nxsrd.mongodb.net/dbsuperheroes",
    );
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}
// ========================
// Modelo (Schema)
// ========================
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
  // La opción { collection: "dbsuperheroes" } se utiliza para especificar el nombre de la colección en MongoDB
  //  donde se almacenarán los documentos de este modelo.
  { collection: "dbsuperheroes" },
  // { collection: "nuevacollecion" },
);
// Se crea un modelo de Mongoose llamado "SuperHero" basado en el esquema definido anteriormente.
// para poder interactuar con la colección "dbsuperheroes" en MongoDB utilizando este modelo.
const SuperHero = mongoose.model("SuperHero", superheroSchema);

// ========================
// Funciones de acceso a datos
// ========================
async function obtenerTodos() {
  //find() es un método de Mongoose que se utiliza para recuperar documentos de una colección en MongoDB.
  // En este caso, SuperHero.find() se utiliza para obtener todos los documentos de la colección "dbsuperheroes".
  //  El resultado será un array de objetos que representan a cada superhéroe almacenado en la base de datos.
  return await SuperHero.find();
}

async function buscarPorPlaneta(planetaOrigen) {
  // SuperHero.find({ planetaOrigen }) es una consulta que busca todos los documentos en la colección "dbsuperheroes" donde el campo "planetaOrigen"
  // coincide con el valor proporcionado.
  return await SuperHero.find({ planetaOrigen });
}

async function obtenerPorNombre(nombreSuperHeroe) {
  // SuperHero.findOne({ nombreSuperHeroe }) es una consulta que busca un solo documento en la colección "dbsuperheroes" donde el campo "nombreSuperHeroe"
  // coincide con el valor proporcionado.
  return await SuperHero.findOne({ nombreSuperHeroe });
}

async function insertar(datos) {
  // Se crea una nueva instancia del modelo SuperHero con los datos proporcionados.
  const hero = new SuperHero(datos);
  // Se guarda el nuevo superhéroe en la base de datos.
  //save() es un método de Mongoose que se utiliza para guardar un documento en la base de datos.
  //  En este caso, hero.save() guarda el nuevo superhéroe creado en la colección "dbsuperheroes".
  // El resultado de esta operación será el documento guardado, incluyendo su ID generado automáticamente por MongoDB.
  return await hero.save();
}

async function actualizar(nombreSuperHeroe, datosActualizados) {
  // SuperHero.updateOne() es un método de Mongoose que se utiliza para actualizar un documento en la colección "dbsuperheroes".
  return await SuperHero.updateOne(
    { nombreSuperHeroe },
    { $set: datosActualizados },
  );
}

async function eliminar(nombreSuperHeroe) {
  // SuperHero.deleteOne() es un método de Mongoose que se utiliza para eliminar un documento de la colección "dbsuperheroes"
  // que coincide con el criterio especificado.
  return await SuperHero.deleteOne({ nombreSuperHeroe });
}

// ========================
// App y servidor
// ========================
const app = express();
const PORT = 3000;

app.use(express.json());

// GET /api/heroes - Obtener todos los superhéroes
//request es la solicitud entrante al servidor, y response es la respuesta que el servidor enviará de vuelta al cliente.
app.get("/api/heroes", async (request, response) => {
  // console.log("request", request) muestra la solicitud entrante al servidor,
  // incluyendo detalles como los encabezados, el cuerpo de la solicitud, los parámetros de consulta, etc.
  console.log("request", request);
  // similarmente, console.log("response", response) muestra la respuesta que el servidor está preparando para enviar de vuelta al cliente,
  // incluyendo detalles como el estado de la respuesta, los encabezados, el cuerpo de la respuesta, etc.
  const heroes = await obtenerTodos();
  response.json(heroes);
});

// GET /api/heroes/buscar?planetaOrigen=Tierra - Buscar por planeta
// la api permite las consultas con parámetros de consulta, como ?planetaOrigen=Tierra,
//  para filtrar los resultados según el planeta de origen de los superhéroes.
app.get("/api/heroes/buscar", async (req, res) => {
  // console.log("req.query", req.query.planetaOrigen);
  console.log("req.query", req.query);
  const heroes = await buscarPorPlaneta(req.query.planetaOrigen || "Tierra");
  res.json(heroes);
});

// GET /api/heroes/:nombre - Obtener un superhéroe por nombre
app.get("/api/heroes/:nombre", async (req, res) => {
  console.log("req.params", req.params);
  // se recibe params como un objeto que contiene los parámetros de ruta definidos en la URL.
  // En este caso, el parámetro "nombre" se extrae de la URL y se utiliza para buscar un superhéroe
  // específico en la base de datos.
  // req es la solicitud entrante al servidor, y req.params.nombre se
  // refiere al valor del parámetro "nombre" en la URL.
  const hero = await obtenerPorNombre(req.params.nombre);

  if (!hero) {
    return res.status(404).json({ error: "Superhéroe no encontrado" });
  }
  res.json(hero);
});

// POST /api/heroes - Insertar un nuevo superhéroe
app.post("/api/heroes", async (req, res) => {
  console.log("req.body", req);
  // req.body contiene los datos del nuevo superhéroe enviados en la solicitud.
  const hero = await insertar(req.body);
  res.status(201).json(hero);
});

// PUT /api/heroes/:nombre - Actualizar un superhéroe por nombre
app.put("/api/heroes/:nombre", async (req, res) => {
  const result = await actualizar(req.params.nombre, req.body);
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "Superhéroe no encontrado" });
  }
  res.json({ mensaje: "Superhéroe actualizado", resultado: result });
});

// DELETE /api/heroes/:nombre - Eliminar un superhéroe por nombre
app.delete("/api/heroes/:nombre", async (req, res) => {
  const result = await eliminar(req.params.nombre);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "Superhéroe no encontrado" });
  }
  res.json({ mensaje: "Superhéroe eliminado", resultado: result });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
