// File /api/email/controllers/Email.js
"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  send: async (ctx, { env }) => {
    const body = ctx.request.body;
    const sendTo = process.env.EMAIL_ADDRESS_HLP;
    strapi.log.debug(`Trying to send an email to ${sendTo}`);

    try {
      const emailOptions = {
        to: sendTo,
        subject: `[HLP Studio] ${body.bootcampClientName} de ${body.bootcampClientCompany} est interessé(e) par un bootcamp !`,
        html: `
        <h1>Nouvelle demande de Bootcamp de la part de ${
          body.bootcampClientName
        } de la société ${body.bootcampClientCompany}</h1>
        <p>Elle concerne les services suivants :</p>
        <h3>${body.bootcampServices.join(" - ")}</h3>
        <p>Le client souhaiterait que les séances se déroulent <b>${
          body.bootcampWhere
        }</b> pendant <b><i>${body.bootcampWhen}</i></b>.</p>

        <p>Adresse mail du client : ${body.bootcampClientEmail}</p>
        `,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }

    try {
      const emailOptions = {
        to: body.bootcampClientEmail,
        subject: `[HLP Studio] Nous avons bien reçu votre demande de bootcamp !`,
        html: `
        <h1>Merci ${body.bootcampClientName} de nous faire confiance</h1>
        <p>Nous allons prendre en charge votre demande et vous recontacter dans les meilleurs délais.</p>
        <h3>Récapitulatif de votre bootcamp : </h3>
        <p>Vous souhaiteriez que les séances se déroulent <b>${
          body.bootcampWhere
        }</b> pendant <b><i>${body.bootcampWhen}</i></b>.</p>
        <p>Elles comprendront les services suivants :</p>
        <h3>${body.bootcampServices.join(" - ")}</h3>

        <p><i>Si besoin de plus d'informations n'hésitez pas à nous contacter à cette adresse mail : <a href="mailto:baptiste.husson@hlp.group" target="_blank">baptiste.husson@hlp.group</a></i></p>
        `,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${body.bootcampClientEmail}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${body.bootcampClientEmail}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};
