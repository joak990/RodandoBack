const express = require('express');
const UsersRouter = express.Router();
const enviarCorreoMasivoDesdeDB = require('../Controllers/sendmailcontroller');
const createuser = require('../Controllers/userscontrollers');


UsersRouter.post("/users", async (req,res) => {
    try {
        const {email} = req.body
        console.log(email,"sdsdsdsdssd");
    const newuser = await createuser(email)
    res.status(200).json(newuser)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});





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

UsersRouter.post("/sendmail", async (req, res) => {
    try {
        const { asunto, enlace } = req.body;
      
         console.log(asunto,enlace,"body");
       
        // Llama a la función que enviará el correo, pasando la ruta del archivo
        //const newuser = await enviarCorreoMasivoDesdeDB(asunto, photoFilePath, enlace);
         
        res.status(200).json("newuser");
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
























module.exports =  UsersRouter;