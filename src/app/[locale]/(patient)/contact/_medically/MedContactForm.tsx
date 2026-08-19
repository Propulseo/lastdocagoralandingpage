"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLocale } from "next-intl";

import { getContactCopy } from "@/app/[locale]/(patient)/contact/_medically/contactCopy";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

/**
 * Portage de components/ContactFrom/ContactForm.jsx.
 *
 * Memes champs que le template ; la liste « Services » devient une liste de
 * motifs de contact, plus utile sur un annuaire qu'une liste de specialites
 * (pour prendre rendez-vous, on passe par la recherche, pas par ce formulaire).
 *
 * Le <select> porte `no-nice` : le plugin jQuery NiceSelect habille tous les
 * selects du site et remplacerait le style du template par le sien.
 *
 * Le formulaire n'envoie rien pour l'instant et l'annonce clairement. Le
 * branchement reel reste a faire : il faudra choisir le service d'envoi et
 * confirmer l'adresse de reception.
 */
export default function MedContactForm() {
  /* Composant client : la locale vient du contexte next-intl. Les messages
     d'erreur sont produits ici, à la validation — ils doivent donc suivre la
     langue de la page au même titre que les libellés. */
  const locale = useLocale();
  const { form, hero } = getContactCopy(locale);

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<FormState> = {};

    if (!values.name) next.name = form.errorName;
    if (!values.email) next.email = form.errorEmailRequired;
    else if (!/\S+@\S+\.\S+/.test(values.email)) next.email = form.errorEmailInvalid;
    if (!values.subject) next.subject = form.errorSubject;
    if (!values.message) next.message = form.errorMessage;

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setValues(EMPTY);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-validation-active" noValidate>
      <div className="row">
        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder={form.placeholderName}
            />
            {errors.name ? <span className="error">{errors.name}</span> : null}
          </div>
        </div>
        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder={form.placeholderEmail}
            />
            {errors.email ? <span className="error">{errors.email}</span> : null}
          </div>
        </div>
        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <input
              type="tel"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder={form.placeholderPhone}
            />
          </div>
        </div>
        <div className="col col-lg-6 col-12">
          <div className="form-field">
            <select
              className="no-nice"
              name="subject"
              value={values.subject}
              onChange={handleChange}
            >
              <option value="">{form.subjectLabel}</option>
              {form.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject ? <span className="error">{errors.subject}</span> : null}
          </div>
        </div>
        <div className="col col-lg-12 col-12">
          <div className="form-field">
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              placeholder={form.placeholderMessage}
            />
            {errors.message ? <span className="error">{errors.message}</span> : null}
          </div>
        </div>
      </div>
      <div className="submit-area">
        <button type="submit" className="theme-btn">
          {form.submit}
        </button>
      </div>
      {/* Confirmation : pastille check teal + texte factuel (styles dans
          medically-overrides.css) — plus jamais la classe .error (rouge)
          pour annoncer un succès. */}
      {sent ? (
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
              {form.successText}{" "}
              <a href={`mailto:${hero.email}`}>{hero.email}</a>.
            </p>
          </div>
        </div>
      ) : null}
    </form>
  );
}
