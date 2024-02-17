const express = require('express');
const UsersRouter = express.Router();
const enviarCorreoMasivoDesdeDB = require('../Controllers/sendmailcontroller');
const createuser = require('../Controllers/userscontrollers');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

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







UsersRouter.post("/sendmail", upload.single('photoFile'), async (req, res) => {
    try {
        const { asunto, enlace } = req.body;
        const photoFilePath = req.file.path; // Ruta del archivo adjunto
         console.log(asunto,enlace,"body");
        console.log(photoFilePath,"foto");
        // Llama a la función que enviará el correo, pasando la ruta del archivo
        const newuser = await enviarCorreoMasivoDesdeDB(asunto, photoFilePath, enlace);
         
        res.status(200).json(newuser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});
























module.exports =  UsersRouter;