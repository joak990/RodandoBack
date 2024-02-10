const nodemailer = require('nodemailer');
const User = require('../Models/user'); // Ajusta la ruta según tu estructura de archivos
async function enviarCorreoMasivoDesdeDB(asunto, mensaje, enlace) {
    try {
      // Obtener todos los usuarios de la base de datos
      const usuarios = await User.find({}, 'email'); // Obtiene solo los campos de email de los usuarios
  
      // Obtener solo los correos electrónicos de los usuarios
      const destinatarios = usuarios.map(usuario => usuario.email);
  
      // Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Usar SSL
        auth: {
          user: 'rodandodondesea@gmail.com',
          pass: 'wxjrejlwntqfzyvm'
        }
      });
  
      // Construir el mensaje con el enlace y estilos CSS
      const mensajeConEstilos = `
        <div style="color: #333; font-family: Arial, sans-serif;">
          <p>${mensaje}</p>
          <p style="color: #666; font-style: italic;">Este es un mensaje importante.</p>
          <p><a href="${enlace}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Ir al enlace</a></p>
        </div>
      `;
  
      // Configurar el mensaje
      let mailOptions = {
        from: 'rodandodondesea@gmail.com', // Tu dirección de correo electrónico
        to: destinatarios.join(','), // Concatenar los destinatarios separados por comas
        subject: asunto,
        html: mensajeConEstilos // Incluir el mensaje con los estilos
      };
  
      // Enviar el correo electrónico
      let info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
  
  // Ejemplo de uso de la función enviarCorreoMasivoDesdeDB
  const asunto = 'Asunto del correo';
  const mensajeDesdeFrontend = 'Este es el mensaje que viene desde el frontend.';
  const enlaceDesdeFrontend = 'https://tu-url-aqui';

  
module.exports = enviarCorreoMasivoDesdeDB;