const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const mongoose = require("mongoose")
const User = require("./Models/user")
const routes = require('./Routes/index');
const bodyParser = require('body-parser');




app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', routes);

mongoose.connect("mongodb+srv://mongo:mongo@cluster0.hrddqt6.mongodb.net/rodando").then(()=>console.log("db conectada")).catch(e=>console.log("fallo"+e))
app.listen(PORT,()=>console.log("anda",PORT))