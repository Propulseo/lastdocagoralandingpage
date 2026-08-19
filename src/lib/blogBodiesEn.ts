import type { BlogBlock } from "@/lib/blog";

/**
 * Blog article bodies, in English.
 *
 * EN counterpart to lib/blogBodies.ts (PT) and lib/blogBodiesFr.ts (FR). Split
 * out to keep each file under ~200 lines. Faithful translation of the same
 * articles, DocAgora voice preserved.
 */

export const BODY_ENCONTRAR_MEDICO_EN: BlogBlock[] = [
  {
    type: "p",
    text: "Moving to a new country always has a touch of vertigo, and health is one of the first things that makes us feel lost. The Portuguese system doesn't work like the one you came from, the names are different, and no one hands you a manual on arrival. The good news is that the first steps are simple, as long as you take them in the right order.",
  },
  { type: "h3", text: "First step: the utente number" },
  {
    type: "p",
    text: "Almost everything in the National Health Service (SNS) starts with the utente number. It's the identifier that links you to the public system and that you'll be asked for at any appointment, pharmacy or emergency room. If you already have legal residence, you can request it at the health centre for your area, with an ID document and proof of address.",
  },
  {
    type: "p",
    text: "While you wait for it, keep the useful contacts handy: the SNS 24 line (808 24 24 24) answers health questions at any hour and in several languages, and saves many unnecessary trips to A&E.",
  },
  { type: "h3", text: "Family doctor: how to be assigned one" },
  {
    type: "p",
    text: "The family doctor is your gateway to the rest of the system: they follow your history, prescribe and refer you to specialists. Assignment happens at the health centre, and isn't always immediate — in some areas there's a waiting list. Register as soon as you can, even if the follow-up only starts later.",
  },
  {
    type: "list",
    items: [
      "ID document (citizen card, passport or residence permit)",
      "Proof of address in the health centre's area",
      "Utente number, if you already have one",
      "Tax identification number (NIF), often requested at the same desk",
    ],
  },
  {
    type: "quote",
    text: "Don't wait until you're ill to register. The right time to find a doctor is before you need one.",
  },
  { type: "h3", text: "When the private sector makes sense" },
  {
    type: "p",
    text: "The private sector doesn't replace the SNS, but it solves concrete situations: a quick appointment with no waiting list, a specialist in a language you're comfortable with, a time that fits around work. Many health insurers cover part of the cost, and the price of first appointments is usually stated upfront.",
  },
  {
    type: "gallery",
    images: ["/medically/images/blog/img-4.jpg", "/medically/images/blog/img-5.jpg"],
  },
  {
    type: "p",
    text: "That's where DocAgora helps: it brings professionals together by specialty, city and spoken language, with profiles side by side to compare. Instead of calling blindly, you see who's available near you and book online — no calls, no waiting on hold.",
  },
];

export const BODY_CONSULTAR_LINGUA_EN: BlogBlock[] = [
  {
    type: "p",
    text: "There's a huge difference between ordering a coffee and describing pain. In an appointment, every word counts: the exact spot, how long it's been going on, whether it's tight or burning, what you've already taken. Doing this in a language you don't master well isn't just uncomfortable — it changes the quality of what the doctor can understand.",
  },
  { type: "h3", text: "A poorly described symptom is a harder diagnosis" },
  {
    type: "p",
    text: "The doctor works with what they're told. When words are missing, the patient simplifies, shrugs, answers «more or less». Details that seemed secondary get left out, and it's often those details that guide the diagnosis. The language barrier doesn't create loud misunderstandings; it creates silences.",
  },
  {
    type: "p",
    text: "In the other direction, instructions get lost too. A dose, the time to take a medicine, a warning sign to watch for — if the explanation isn't understood, the simplest treatment fails at home.",
  },
  {
    type: "quote",
    text: "Being seen in your own language isn't a comfort luxury. It's the condition for what you feel to reach, intact, the person treating you.",
  },
  { type: "h3", text: "It's not only a matter of vocabulary" },
  {
    type: "list",
    items: [
      "Describing a symptom's intensity and progression precisely",
      "Recounting your history and allergies without leaving anything out",
      "Understanding a diagnosis and giving informed consent",
      "Leaving the appointment knowing exactly what to do next",
    ],
  },
  {
    type: "p",
    text: "An interpreter helps, but isn't always available, and not everyone wants a third person listening to their appointment. Being able to choose, from the outset, a professional who speaks your language solves the problem at the source.",
  },
  { type: "h3", text: "How to filter by language on DocAgora" },
  {
    type: "p",
    text: "Every profile on DocAgora shows the languages the professional speaks. When searching, you can filter by that language alongside specialty and city — and see only the professionals you'll understand from the very first word.",
  },
  {
    type: "p",
    text: "For those who have just arrived, or who simply prefer to talk about their health in their mother tongue, it's a discreet way to make the appointment safer and less intimidating.",
  },
];

export const BODY_PREPARAR_CONSULTA_EN: BlogBlock[] = [
  {
    type: "p",
    text: "A first appointment always goes better when you arrive prepared. It doesn't take much: a few documents, a list of questions and a clear idea of what to expect. Twenty minutes of preparation save you the feeling of having left without answers.",
  },
  { type: "h3", text: "What to bring with you" },
  {
    type: "list",
    items: [
      "ID document and utente number",
      "A list of the medicines you take, with the doses",
      "Previous tests and results that are relevant",
      "Your health insurance details, if you have any and if the appointment is private",
    ],
  },
  {
    type: "p",
    text: "If you've been followed in another country, bring what you can of your history. Even a simple summary saves time and avoids repeating tests you've already had.",
  },
  { type: "h3", text: "The questions worth preparing" },
  {
    type: "p",
    text: "In the moment, it's easy to forget half of what you meant to ask. Write your questions down beforehand, in order of importance, and start with the one that worries you most — if time runs short, the essentials will have been covered.",
  },
  {
    type: "list",
    items: [
      "What is the likely cause of what I'm feeling?",
      "What tests or steps come next, and in what timeframe?",
      "Does the treatment have effects to watch for at home?",
      "What signs should make me seek help again?",
    ],
  },
  {
    type: "quote",
    text: "The question you don't ask is the doubt you take home. There's no such thing as too many questions in an appointment.",
  },
  { type: "h3", text: "Timeframes and prices: no surprises" },
  {
    type: "p",
    text: "In the private sector, the price of the first appointment is usually shown before booking — it's worth confirming it, along with what your insurance covers. Arrive a few minutes early: there's almost always a form to fill in the first time.",
  },
  {
    type: "p",
    text: "On DocAgora, you see each professional's real availability and book the time that suits you, with no phone calls. Arriving prepared to an appointment you chose calmly is often half the way to leaving it reassured.",
  },
];
