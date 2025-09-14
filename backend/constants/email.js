module.exports = {
  resetPasswordEmail: {
    subject: "Reestablecer Contraseña",
    body: `
      <p>Hola {{NAME}},</p>
      <p>Se ha generado la oportunidad para reestablecer tu contraseña.</p>
      <p>La contraseña puede ser cambiada aquí: ${process.env.FRONTEND_URL}/reset-password/{{RESET_TOKEN}}</p>
      <p>Saludos,<br>H2OTrack</p>
    `
  }
};
