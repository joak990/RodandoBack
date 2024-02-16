const nodemailer = require('nodemailer');
const User = require('../Models/user'); // Ajusta la ruta según tu estructura de archivos

async function enviarCorreoMasivoDesdeDB(asunto, foto, enlace) {
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

        // Configurar el mensaje
        let mailOptions = {
            from: 'rodandodondesea@gmail.com', // Tu dirección de correo electrónico
            to: destinatarios.join(','), // Concatenar los destinatarios separados por comas
            subject: asunto,
            html: '', // Inicializar mensaje vacío
            attachments: [
                {
                    filename: 'photo.jpg', // Nombre del archivo adjunto
                    path: foto // Ruta del archivo de la foto
                }
            ]
        };

        // Construir el mensaje con el enlace y estilos CSS antes de adjuntar la foto
        mailOptions.html = `
            <div style="color: #333; font-family: Arial, sans-serif;">
                <p><a href="${enlace}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Ir al enlace</a></p>
                <p style="color: #666; font-style: italic;">Este es un mensaje importante.</p>
            </div>
            <br> <!-- Añadir un espacio después del enlace -->
           
        `;

        // Enviar el correo electrónico
        let info = await transporter.sendMail(mailOptions);

        console.log('Correo enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}

module.exports = enviarCorreoMasivoDesdeDB;
