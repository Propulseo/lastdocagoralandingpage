import type { AboutCopy } from "./aboutCopy";

/* English. */

export const ABOUT_COPY_EN: AboutCopy = {
  hero: {
    eyebrow: "About · DocAgora Pro",
    titleLead: "Who we are shows in",
    titleAccent: "what we build.",
    lead: "Rather than a long speech: DocAgora is a Portuguese platform, live today, connecting patients with verified healthcare professionals. Here is the tool, as it works for a practice.",
    ctaPrimary: "Open my calendar",
    ctaGhost: "See the platform",
    badges: ["24/7 booking", "Automatic reminders", "PT · FR · EN"],
  },
  mock: {
    title: "Calendar — this week",
    live: "Live",
    floatVerified: "Verified profile",
    floatReminder: "Reminder sent · SMS",
    days: [
      {
        name: "Mon",
        slots: [
          { time: "09:00", label: "Consultation", kind: "base" },
          { time: "10:30", label: "Booked online", kind: "online" },
          { time: "14:00", label: "Follow-up", kind: "base" },
        ],
      },
      {
        name: "Tue",
        slots: [
          { time: "09:30", label: "Consultation", kind: "base" },
          { label: "Free", kind: "free" },
          { time: "15:00", label: "Booked · 23:12", kind: "online" },
        ],
      },
      {
        name: "Wed",
        slots: [
          { time: "08:30", label: "Booked online", kind: "online" },
          { time: "11:00", label: "Consultation", kind: "base" },
          { time: "16:30", label: "Assessment", kind: "base" },
        ],
      },
      {
        name: "Thu",
        slots: [
          { label: "Free", kind: "free" },
          { time: "10:00", label: "Booked online", kind: "online" },
          { time: "14:30", label: "Consultation", kind: "base" },
        ],
      },
      {
        name: "Fri",
        slots: [
          { time: "09:00", label: "Consultation", kind: "base" },
          { time: "11:30", label: "Booked online", kind: "online" },
          { label: "Free", kind: "free" },
        ],
      },
    ],
  },
  steps: {
    title: "From sign-up to your first bookings",
    sub: "Our story with every practice starts the same way: a short, checked path, with no surprises.",
    items: [
      {
        num: "1",
        title: "Create your account",
        text: "You enter your activity and your specialties, in a few minutes.",
      },
      {
        num: "2",
        title: "Verification",
        text: "Qualifications and professional registration checked before anything goes live.",
        chip: "“Verified” badge",
      },
      {
        num: "3",
        title: "Online calendar",
        text: "Your availability, your rules: you keep control of every slot.",
      },
      {
        num: "4",
        title: "24/7 bookings",
        text: "Patients book on their own, reminders go out automatically.",
      },
    ],
  },
  bento: {
    title: "What the platform actually does",
    reminders: {
      title: "Automatic reminders",
      text: "Every appointment triggers a reminder before the consultation. Fewer no-shows, fewer wasted slots — without your front desk picking up the phone.",
      smsIn: "Reminder — your appointment is tomorrow at 14:30. Reply YES to confirm.",
      smsOut: "YES",
    },
    verified: {
      title: "Verified profile",
      text: "The badge patients see rests on a real check, carried out before publication.",
      checks: ["Qualifications checked", "Professional body registration", "Identity confirmed"],
    },
    languages: {
      title: "Three languages",
      text: "Your patients book in their own language; your profile exists in all three.",
      rows: [
        { code: "PT", label: "Marcar consulta" },
        { code: "FR", label: "Prendre rendez-vous" },
        { code: "EN", label: "Book an appointment" },
      ],
    },
    gdpr: {
      title: "GDPR by design",
      text: "Your practice's and your patients' data is processed under the GDPR. Rights are respected, not worked around.",
      checks: ["Explicit consent", "Right of access and erasure", "No data resale"],
    },
  },
  metrics: {
    title: "What this changes for a practice",
    footnote:
      "* Illustrative figure: the effect of reminders depends on your activity and your patients.",
    figures: [
      {
        prefix: "−",
        to: 40,
        decimals: 0,
        suffix: " %",
        sup: "*",
        label: "missed appointments, thanks to reminders",
      },
      { text: "24/7", label: "online booking, even when the practice is closed" },
      { to: 3, decimals: 0, label: "languages — PT · FR · EN — for your patients" },
    ],
  },
};
