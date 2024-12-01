const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configuración de middleware
app.use(bodyParser.json());  // Para parsear datos JSON

// Conexión con la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/personasDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error de conexión a MongoDB: ', err));

// Esquema de Persona
const personaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  fecha_nacimiento: Date,
  descripcion: String,
  imagen: String, // Ruta de la imagen
  archivado: { type: Boolean, default: false }  // Si está archivado o no
});

// Modelo de Persona
const Persona = mongoose.model('Persona', personaSchema);

// Endpoint para crear persona
app.post('/personas', async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, descripcion, imagen } = req.body;

  const nuevaPersona = new Persona({
    nombre,
    apellido,
    fecha_nacimiento,
    descripcion,
    imagen
  });

  try {
    const personaGuardada = await nuevaPersona.save();
    res.status(201).json(personaGuardada);  // Devuelve la persona guardada
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para obtener todas las personas
app.get('/personas', async (req, res) => {
  try {
    const personas = await Persona.find({ archivado: false });
    res.json(personas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para archivar persona
app.patch('/archivar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const personaArchivada = await Persona.findByIdAndUpdate(id, { archivado: true }, { new: true });
    res.json(personaArchivada);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para obtener personas archivadas
app.get('/archivadas', async (req, res) => {
  try {
    const personasArchivadas = await Persona.find({ archivado: true });
    res.json(personasArchivadas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Puerto del servidor
app.listen(3000, () => {
  console.log('Servidor ejecutándose en el puerto 3000');
});
