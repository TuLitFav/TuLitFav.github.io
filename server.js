const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Configuración del servidor
app.use(express.json());
app.use(cors());

// Conectar a MongoDB Atlas
const MONGO_URI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelo de datos
const Person = mongoose.model('Person', {
    name: String,
    surname: String,
    dob: String,
    info: String,
    image: String,
});

// Rutas API
app.get('/api/personas', async (req, res) => {
    const personas = await Person.find();
    res.json(personas);
});

app.post('/api/personas', async (req, res) => {
    const nuevaPersona = new Person(req.body);
    await nuevaPersona.save();
    res.status(201).json(nuevaPersona);
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
