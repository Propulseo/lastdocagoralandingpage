export type ContactMessage = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  locale: string;
};

/**
 * Corps HTML du message reçu par l'équipe.
 *
 * Volontairement sobre et en styles en ligne : les clients de messagerie
 * ignorent une grande partie du CSS, et beaucoup suppriment les feuilles de
 * style externes. Un tableau et quelques couleurs suffisent.
 */
export function renderContactEmail(data: ContactMessage): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:7px 16px 7px 0;color:#6B7280;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
           <td style="padding:7px 0;font-size:14px;color:#14191D;">${escapeHtml(value)}</td>
         </tr>`
      : "";

  return `<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;max-width:560px;color:#14191D;">
  <h2 style="margin:0 0 4px;font-size:18px;font-weight:600;color:#244882;">Nova mensagem — DocAgora</h2>
  <p style="margin:0 0 22px;color:#6B7280;font-size:13px;">
    Formulário de contacto · versão ${escapeHtml(data.locale)}
  </p>
  <table style="border-collapse:collapse;width:100%;">
    ${row("Nome", data.name)}
    ${row("E-mail", data.email)}
    ${row("Telefone", data.phone ?? "")}
    ${row("Assunto", data.subject)}
  </table>
  <div style="margin-top:22px;padding:16px 18px;background:#F3F5F6;border-radius:8px;
              white-space:pre-wrap;font-size:14px;line-height:1.55;">${escapeHtml(data.message)}</div>
  <p style="margin:22px 0 0;color:#7C8890;font-size:12px;">
    Responda diretamente a este e-mail para contactar a pessoa.
  </p>
</div>`;
}

/**
 * Le contenu vient d'un formulaire public : tout doit être échappé avant
 * d'entrer dans du HTML. Sans ça, n'importe qui pourrait injecter du balisage
 * — voire un lien trompeur — dans la boîte mail de l'équipe.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
