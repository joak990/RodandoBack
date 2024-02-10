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





UsersRouter.post("/sendmail", async (req,res) => {
    try {
        const {asunto,mensaje,enlace} = req.body
        console.log(asunto,mensaje);
    const newuser = await enviarCorreoMasivoDesdeDB(asunto,mensaje,enlace)
    res.status(200).json(newuser)
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

























module.exports =  UsersRouter;