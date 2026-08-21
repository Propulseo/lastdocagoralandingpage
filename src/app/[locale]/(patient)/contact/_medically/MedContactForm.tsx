"use client";

import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getContactCopy } from "@/app/[locale]/(patient)/contact/_medically/contactCopy";
import { sendContactMessage } from "@/app/[locale]/(patient)/contact/_medically/sendContactMessage";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

/**
 * Formulaire de contact de /contact.
 *
 * Il affichait auparavant une confirmation sans rien envoyer : le visiteur
 * repartait convaincu d'avoir écrit, son message était perdu. Il est
 * maintenant transmis par une action serveur, et l'échec est annoncé
 * honnêtement plutôt que masqué par un faux succès.
 *
 * Accessibilité : chaque champ porte un vrai <label> (les placeholders
 * disparaissent à la saisie et ne remplacent pas un libellé), les erreurs
 * sont reliées à leur champ et annoncées, et le focus se pose sur le premier
 * champ fautif à la soumission.
 *
 * Le <select> porte encore `no-nice`, hérité de l'époque où le plugin jQuery
 * NiceSelect habillait tous les selects. jQuery a été retiré du projet :
 * cette classe est sans effet, conservée le temps de vérifier qu'aucune règle
 * du template ne s'y accroche.
 */
export default function MedContactForm() {
  /* Composant client : la locale vient du contexte next-intl. Les messages
     d'erreur sont produits ici, à la validation — ils doivent donc suivre la
     langue de la page au même titre que les libellés. */
  const locale = useLocale();
  const { form, hero } = getContactCopy(locale);
  const uid = useId();

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (name: keyof FormState) => `${uid}-${name}`;
  const errorId = (name: keyof FormState) => `${uid}-${name}-error`;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<FormState> = {};

    if (!values.name) next.name = form.errorName;
    if (!values.email) next.email = form.errorEmailRequired;
    else if (!/\S+@\S+\.\S+/.test(values.email)) next.email = form.errorEmailInvalid;
    if (!values.subject) next.subject = form.errorSubject;
    if (!values.message) next.message = form.errorMessage;

    setErrors(next);

    if (Object.keys(next).length > 0) {
      /* Sans ce déplacement, quelqu'un au lecteur d'écran reste sur le bouton
         « Envoyer » sans savoir ce qui a échoué ni où corriger. */
      const first = Object.keys(next)[0] as keyof FormState;
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)
        ?.focus();
      return;
    }

    setStatus("sending");

    const payload = new FormData();
    payload.set("name", values.name);
    payload.set("email", values.email);
    payload.set("phone", values.phone);
    payload.set("subject", values.subject);
    payload.set("message", values.message);
    payload.set("locale", locale);

    const result = await sendContactMessage(payload);

    if (result.ok) {
      setStatus("sent");
      setValues(EMPTY);
    } else {
      setStatus("failed");
    }
  }

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="contact-validation-active"
      noValidate
    >
      <style>{`
        /* Libellés lus par les technologies d'assistance, invisibles à l'écran :
           le gabarit du template repose sur les placeholders seuls. */
        .mcf-label {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .mcf-required { margin: 0 0 18px; font-size: 13px; color: var(--text-muted, #6B7280); }
        .mcf-privacy { margin: 18px 0 0; font-size: 13px; line-height: 1.5; color: var(--text-muted, #6B7280); }
        .mcf-privacy a { color: inherit; text-decoration: underline; }
        .mcf-fail {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-top: 20px;
          padding: 14px 16px;
          border-radius: 10px;
          background: #FBEAE5;
          color: #8F3018;
        }
        .mcf-fail p { margin: 0; font-size: 14px; line-height: 1.5; }
        .mcf-fail strong { display: block; font-size: 14.5px; margin-bottom: 2px; }
        .mcf-fail a { color: inherit; }
      `}</style>

      <p className="mcf-required">{form.requiredNote}</p>

      <div className="row">
        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <label className="mcf-label" htmlFor={fieldId("name")}>
              {form.labelName}
            </label>
            <input
              id={fieldId("name")}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder={`${form.placeholderName} *`}
              required
              aria-required="true"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? errorId("name") : undefined}
              disabled={sending}
            />
            {errors.name ? (
              <span className="error" id={errorId("name")}>
                {errors.name}
              </span>
            ) : null}
          </div>
        </div>

        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <label className="mcf-label" htmlFor={fieldId("email")}>
              {form.labelEmail}
            </label>
            <input
              id={fieldId("email")}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder={`${form.placeholderEmail} *`}
              required
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? errorId("email") : undefined}
              disabled={sending}
            />
            {errors.email ? (
              <span className="error" id={errorId("email")}>
                {errors.email}
              </span>
            ) : null}
          </div>
        </div>

        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <label className="mcf-label" htmlFor={fieldId("phone")}>
              {form.labelPhone}
            </label>
            <input
              id={fieldId("phone")}
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder={form.placeholderPhone}
              disabled={sending}
            />
          </div>
        </div>

        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <label className="mcf-label" htmlFor={fieldId("subject")}>
              {form.labelSubject}
            </label>
            <select
              id={fieldId("subject")}
              className="no-nice"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              required
              aria-required="true"
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={errors.subject ? errorId("subject") : undefined}
              disabled={sending}
            >
              <option value="">{`${form.subjectLabel} *`}</option>
              {form.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject ? (
              <span className="error" id={errorId("subject")}>
                {errors.subject}
              </span>
            ) : null}
          </div>
        </div>

        <div className="col col-lg-12 col-12">
          <div className="form-field">
            <label className="mcf-label" htmlFor={fieldId("message")}>
              {form.labelMessage}
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder={`${form.placeholderMessage} *`}
              required
              aria-required="true"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? errorId("message") : undefined}
              disabled={sending}
            />
            {errors.message ? (
              <span className="error" id={errorId("message")}>
                {errors.message}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="submit-area">
        <button type="submit" className="theme-btn" disabled={sending}>
          {sending ? form.sending : form.submit}
        </button>
      </div>

      <p className="mcf-privacy">
        {form.privacyNotice}{" "}
        <Link href="/privacy-policy">{form.privacyLinkLabel}</Link>.
      </p>

      {/* Confirmation : pastille check teal + texte factuel (styles dans
          medically-overrides.css) — plus jamais la classe .error (rouge)
          pour annoncer un succès. */}
      {status === "sent" ? (
        <div className="contact-success" role="status">
          <span className="contact-success__tick" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div>
            <p className="contact-success__title">{form.successTitle}</p>
            <p className="contact-success__text">
              {form.successText} <a href={`mailto:${hero.email}`}>{hero.email}</a>.
            </p>
          </div>
        </div>
      ) : null}

      {status === "failed" ? (
        <div className="mcf-fail" role="alert">
          <p>
            <strong>{form.errorSendTitle}</strong>
            {form.errorSendText}{" "}
            <a href={`mailto:${hero.email}`}>{hero.email}</a>.
          </p>
        </div>
      ) : null}
    </form>
  );
}
