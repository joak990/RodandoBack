const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');
const mongoose = require("mongoose");
const User = require("./Models/user");
const routes = require('./Routes/index');
const bodyParser = require('body-parser');
const multer = require('multer'); // Importa multer para manejar archivos

// Configura multer para guardar los archivos en una ubicación específica
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // La carpeta "uploads" debe existir en tu proyecto
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Renombra el archivo con un nombre único
  }
});

const upload = multer({ storage: storage }); // Crea el middleware de multer con la configuración de almacenamiento

// Middleware para el registro de solicitudes
app.use(morgan('dev'));

// Middleware para analizar solicitudes con cuerpo JSON
app.use(bodyParser.json({ limit: '100mb' }));

// Middleware para analizar solicitudes con cuerpo URL codificado
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Middleware para servir archivos estáticos si es necesario
// app.use(express.static('public'));

// Rutas de la aplicación
app.use('/', routes);

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb+srv://mongo:mongo@cluster0.hrddqt6.mongodb.net/rodando").then(()=>console.log("db conectada")).catch(e=>console.log("fallo"+e))

// Iniciar el servidor
app.listen(PORT,()=>console.log("Server running on port", PORT));
