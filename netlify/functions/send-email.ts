import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env['RESEND_API_KEY']);
const TO_EMAIL   = 'hamatwalid@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev'; // TODO: remplacer par contact@resteflex.fr après vérification du domaine

// ── Templates HTML ────────────────────────────────────────────────────────────

function baseLayout(accentColor: string, icon: string, title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f8f7ff;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7ff;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(139,92,246,0.10);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,${accentColor});padding:32px 40px;text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">${icon}</div>
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">${title}</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">ResteFlex Conciergerie</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px 40px;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f8f7ff;text-align:center;border-top:1px solid #ede9fe;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">ResteFlex Conciergerie · Message reçu depuis le site web</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function infoRow(emoji: string, label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
      <span style="color:#6b7280;font-size:13px;">${emoji} ${label}</span><br>
      <span style="color:#1f2937;font-size:15px;font-weight:600;">${value || '—'}</span>
    </td>
  </tr>`;
}

function section(title: string, rows: string): string {
  return `<div style="margin-bottom:24px;">
    <h2 style="margin:0 0 12px;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b5cf6;">${title}</h2>
    <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
  </div>`;
}

function clientSection(d: any): string {
  return section('👤 Contact', [
    infoRow('', 'Nom', d.from_name),
    infoRow('📧', 'Email', `<a href="mailto:${d.from_email}" style="color:#8b5cf6;">${d.from_email}</a>`),
    infoRow('📱', 'Téléphone', d.from_phone || 'Non renseigné'),
  ].join(''));
}

function messageSection(msg: string): string {
  return `<div style="margin-top:16px;background:#f8f7ff;border-left:4px solid #8b5cf6;border-radius:0 8px 8px 0;padding:16px 20px;">
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#8b5cf6;">💭 Message</p>
    <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${msg || 'Aucun message supplémentaire.'}</p>
  </div>`;
}

// ── Travel Pack ───────────────────────────────────────────────────────────────

function travelTemplate(d: any): string {
  const body = [
    clientSection(d),
    section('🏠 Bien', [
      infoRow('🏠', 'Type', d.propertyType),
      infoRow('✨', 'Style', d.propertyStyle),
      infoRow('📏', 'Surface', d.surface ? `${d.surface} m²` : ''),
      infoRow('📍', 'Localisation', d.location),
    ].join('')),
    section('📅 Disponibilités', [
      infoRow('📅', 'Du', d.availabilityStart),
      infoRow('📅', 'Au', d.availabilityEnd),
    ].join('')),
    messageSection(d.message),
  ].join('');

  return baseLayout(
    '#4facfe,#00f2fe',
    '🏖️',
    `Travel Pack — ${d.from_name}`,
    body
  );
}

// ── Business Pack ─────────────────────────────────────────────────────────────

function businessTemplate(d: any): string {
  const body = [
    clientSection(d),
    section('💼 Projet', [
      infoRow('🏢', 'Nombre de biens', d.propertyCount),
      infoRow('💰', "Type d'investissement", d.investmentType),
      infoRow('📈', 'Revenus actuels', d.currentRevenue),
    ].join('')),
    messageSection(d.message),
  ].join('');

  return baseLayout(
    '#8b5cf6,#d946ef',
    '💼',
    `Business Pack — ${d.from_name}`,
    body
  );
}

// ── Serenity Pack ─────────────────────────────────────────────────────────────

function serenityTemplate(d: any): string {
  const body = [
    clientSection(d),
    section('🏡 Bien', [
      infoRow('🏠', 'Type', d.propertyType),
      infoRow('📏', 'Surface', d.surface ? `${d.surface} m²` : ''),
      infoRow('📍', 'Localisation', d.location),
      infoRow('💰', 'Loyer actuel', d.currentRent),
      infoRow('💎', 'Valeur estimée', d.propertyValue),
    ].join('')),
    messageSection(d.message),
  ].join('');

  return baseLayout(
    '#10b981,#14b8a6',
    '🏡',
    `Serenity Pack — ${d.from_name}`,
    body
  );
}

// ── Handler ───────────────────────────────────────────────────────────────────

const TEMPLATES: Record<string, (d: any) => string> = {
  travel:   travelTemplate,
  business: businessTemplate,
  serenity: serenityTemplate,
};

const SUBJECTS: Record<string, string> = {
  travel:   '🏖️ Nouvelle demande Travel Pack',
  business: '💼 Nouvelle demande Business Pack',
  serenity: '🏡 Nouvelle demande Serenity Pack',
};

export const handler: Handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { packType, ...emailData } = data;

    const templateFn = TEMPLATES[packType];
    if (!templateFn) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Pack type invalide' }) };
    }

    const { error } = await resend.emails.send({
      from:    `ResteFlex Conciergerie <${FROM_EMAIL}>`,
      to:      [TO_EMAIL],
      replyTo: `${emailData.from_name} <${emailData.from_email}>`,
      subject: `${SUBJECTS[packType]} — ${emailData.from_name}`,
      html:    templateFn(emailData),
    });

    if (error) {
      console.error('[send-email] Resend error:', error);
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };

  } catch (err: any) {
    console.error('[send-email] Exception:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
