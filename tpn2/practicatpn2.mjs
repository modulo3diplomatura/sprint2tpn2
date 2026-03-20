import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose
  .connect(
    "mongodb+srv://augustodelcampo97:Nodotecnologico@cluster0.nxsrd.mongodb.net/dbsuperheroes",
  )
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));
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
//Creamos el modelo de Mongoose llamado "SuperHero" basado en el esquema definido anteriormente,
//para poder utilizar los metodos de Mongoose para realizar operaciones CRUD en la colección "dbsuperheroes" de la base de datos MongoDB.
//crud es un acrónimo que se refiere a las operaciones básicas de una base de datos: Crear, Leer, Actualizar y Eliminar (Create, Read, Update, Delete).
const SuperHero = mongoose.model("SuperHero", superheroSchema);

//SECCION DE DECLARACION DE FUNCIONES ASINCRONAS PARA REALIZAR LAS OPERACIONES CRUD EN LA BASE DE DATOS /////////////////////////////////////////
async function obtenerTodos() {
  return await SuperHero.find();
}
async function obtenerPorNombre(nombreSuperHeroe) {
  return await SuperHero.findOne({ nombreSuperHeroe });
}
async function buscarPorPlaneta(planetaOrigen) {
  return await SuperHero.find({ planetaOrigen });
}
async function insertarHeroesDinamico(datos) {
  const hero = new SuperHero(datos);
  return await hero.save();
}
async function actualizar(nombreSuperHeroe, datosActualizados) {
  return await SuperHero.updateOne(
    { nombreSuperHeroe },
    { $set: datosActualizados },
  );
}
async function eliminar(nombreSuperHeroe) {
  return await SuperHero.deleteOne({ nombreSuperHeroe });
}
// Funciones del tp hardcodeadas es decir con datos escritos directamente en el codigo.
async function insertarHeroeHardcodeado() {
  const hero = new SuperHero({
//los datos del superheroe son hardcodeados es decir escritos directamente en el codigo, lo cual no es flexible ni reutilizable,
//ya que cada vez que queramos insertar un superheroe diferente, tendriamos que modificar la función para cambiar los datos hardcodeados.
//la idea es que ingresemos estos datos atraves de postman dinamicamente
    nombreSuperHeroe: "Omniman",
    nombreReal: "Barry Allen",
    edad: 30,
    planetaOrigen: "Tierra",
    debilidad: "Velocidad",
    poderes: ["Velocidad", "Reflejos", "Viajar en el tiempo"],
    aliados: ["Superman", "Batman"],
    enemigos: ["Reverse Flash", "Captain Cold"],
    creador: "DC Comics",
  });
  return await hero.save();
}
async function actualizarHeroeHardcodeado(nombreSuperHeroe) {
  return await SuperHero.updateOne(
    { nombreSuperHeroe },
    // el valor 20 y velocidad frio son hardcodeados es decir escritos directamente en el codigo
    { $set: { edad: 30, debilidad: "batman" } },
  );
}
// inserción sin hardcodeo es decir sin datos escritos directamente en el codigo,
// lo que hace que las funciones sean más flexibles y reutilizables, ya que podemos pasar
// diferentes datos como argumentos para realizar las operaciones CRUD en la base de datos.
async function insertar(datos) {
  const hero = new SuperHero(datos);
  return await hero.save();
}
//esto es lo que hace la funcion insertar(datos) por dentro,crea una nueva instancia de SuperHero
//y con el objeto datos{} que se le pasa como argumento, se asignan las propiedades correspondientes
//al nuevo superheroe, y luego se guarda en la base de datos utilizando el método save() del modelo SuperHero.
async function insertarHeroesReestructurado(datos) {
  const hero = new SuperHero({
    nombreSuperHeroe: datos.nombreSuperHeroe,
    nombreReal: datos.nombreReal,
    edad: datos.edad,
    planetaOrigen: datos.planetaOrigen,
    debilidad: datos.debilidad,
    poderes: datos.poderes,
    aliados: datos.aliados,
    enemigos: datos.enemigos,
    creador: datos.creador,
  });
  return await hero.save();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SECCION DE LLAMADA A EJECUCION DE LAS FUNCIONES PARA REALIZAR LAS OPERACIONES CRUD EN LA BASE DE DATOS ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSULTAS HARDCODEADAS ES DECIR CON DATOS ESCRITOS DIRECTAMENTE EN EL CODIGO, LO CUAL NO ES FLEXIBLE NI REUTILIZABLE, 
// YA QUE CADA VEZ QUE QUERAMOS INSERTAR UN SUPERHEROE DIFERENTE, TENDRIAMOS QUE MODIFICAR LA FUNCION PARA CAMBIAR LOS DATOS HARDCOREADOS.

// insertarHeroeHardcodeado()
// actualizarHeroeHardcodeado("Gatubela")

// CONSULTAS DINAMICAS ///////////////////////////////////////////////////////////////////////////////////
// ESTOS VALORES LOS PASARIAMOS POR POSTMAN, LO QUE HACE QUE LAS FUNCIONES SEAN MÁS FLEXIBLES Y REUTILIZABLES, YA QUE PODEMOS PASAR
// DIFERENTES DATOS COMO ARGUMENTOS PARA REALIZAR LAS OPERACIONES CRUD EN LA BASE DE DATOS.
// insertar({
//   nombreSuperHeroe: "Gatubela",
//   nombreReal: "Barry Allen",
//   edad: 30,
//   planetaOrigen: "Tierra",
//   debilidad: "Velocidad",
//   poderes: ["Velocidad", "Reflejos", "Viajar en el tiempo"],
//   aliados: ["Superman", "Batman"],
//   enemigos: ["Reverse Flash", "Captain Cold"],
//   creador: "DC Comics",
// }).then((resultado) => {
//   console.log("Superhéroe insertado:", resultado);
// });

// actualizar("Gatubela", { edad: 25, debilidad: "Fuerza" });
// eliminar("Gatubela");