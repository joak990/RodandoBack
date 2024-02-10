const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // El correo electrónico es obligatorio
    unique: true, // El correo electrónico debe ser único
    trim: true, // Elimina espacios en blanco al principio y al final del correo electrónico
    lowercase: true // Convierte el correo electrónico a minúsculas
  }
});

// Crear el modelo 'User' utilizando el esquema definido anteriormente
const User = mongoose.model('User', userSchema);

// Exportar el modelo para usarlo en otros archivos
module.exports = User;
