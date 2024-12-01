const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Usa Body Parser para manejar datos JSON
app.use(bodyParser.json());

// Conexión con MongoDB (cambia la cadena de conexión por la tuya)
mongoose.connect('mongodb://atlas-sql-674c91d6f918393eefc59d37-brdoh.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error al conectar: ', err));

// Define el esquema de la persona (estructura de los datos que vamos a guardar)
const personaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  descripcion: String,
  imagen: String, // Aquí guardamos el enlace de la imagen
  archivado: { type: Boolean, default: false } // Si está archivada o no
});

// Crea un modelo con el esquema (para interactuar con la base de datos)
const Persona = mongoose.model('Persona', personaSchema);

// Ruta para agregar una nueva persona
app.post('/personas', async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, descripcion, imagen } = req.body;

  const nuevaPersona = new Persona({ nombre, apellido, fecha_nacimiento, descripcion, imagen });
  try {
    const personaGuardada = await nuevaPersona.save();
    res.status(201).json(personaGuardada); // Devuelve la persona guardada
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener todas las personas (sin las archivadas)
app.get('/personas', async (req, res) => {
  try {
    const personas = await Persona.find({ archivado: false });
    res.json(personas); // Devuelve las personas no archivadas
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para archivar una persona
app.patch('/archivar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const personaArchivada = await Persona.findByIdAndUpdate(id, { archivado: true }, { new: true });
    res.json(personaArchivada); // Devuelve la persona archivada
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Puerto donde estará corriendo el servidor
app.listen(3000, () => {
  console.log('Ser
