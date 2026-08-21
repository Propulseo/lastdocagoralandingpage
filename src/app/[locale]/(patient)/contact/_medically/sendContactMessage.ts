"use server";

import { Resend } from "resend";

import { renderContactEmail } from "@/emails/contact-message";

export type ContactResult = { ok: true } | { ok: false; error: "invalid" | "send_failed" };

/**
 * Adresse de réception et expéditeur. Surchargeables par variables
 * d'environnement pour ne pas avoir à toucher au code si l'adresse change.
 * L'expéditeur doit appartenir à un domaine vérifié chez Resend, sinon
 * l'envoi est refusé.
 */
const RECIPIENT = process.env.CONTACT_RECIPIENT ?? "hello@docagora.com";
const SENDER = process.env.CONTACT_SENDER ?? "DocAgora <noreply@docagora.pt>";

/* Limites de taille : un formulaire public accepte n'importe quoi tant qu'on
   ne borne rien, et rien n'oblige un envoyeur à passer par notre page. */
const MAX = { name: 120, email: 200, phone: 40, subject: 200, message: 5000 };

/**
 * Envoi du message de contact.
 *
 * Le formulaire se contentait auparavant d'afficher une confirmation sans
 * rien transmettre : un visiteur croyait avoir écrit à DocAgora alors que son
 * message était perdu. C'était d'autant plus grave que tout l'entonnoir
 * professionnel (bouton du header, /pro/about, /pro/pricing) aboutit ici.
 */
export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  const read = (key: keyof typeof MAX) =>
    String(formData.get(key) ?? "").trim().slice(0, MAX[key]);

  const name = read("name");
  const email = read("email");
  const phone = read("phone");
  const subject = read("subject");
  const message = read("message");
  const locale = String(formData.get("locale") ?? "pt").trim().slice(0, 5);

  /* La validation du navigateur peut être contournée : on la refait ici, qui
     est le seul endroit dont on contrôle l'exécution. */
  if (!name || !subject || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY absente : le message de contact n'a pas pu être envoyé.",
    );
    return { ok: false, error: "send_failed" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: SENDER,
      to: RECIPIENT,
      /* Répondre à l'e-mail ouvre directement une réponse au visiteur. */
      replyTo: email,
      subject: `Contacto DocAgora — ${subject} — ${name}`,
      html: renderContactEmail({ name, email, phone, subject, message, locale }),
    });

    if (error) {
      console.error("Envoi du message de contact refusé :", error);
      return { ok: false, error: "send_failed" };
    }
    return { ok: true };
  } catch (cause) {
    console.error("Envoi du message de contact impossible :", cause);
    return { ok: false, error: "send_failed" };
  }
}
