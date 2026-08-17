import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_to_pass_build");

export interface OrderItemInfo {
  product_name: string;
  download_url: string;
}

export async function sendOrderConfirmationEmail(
  toEmail: string,
  customerName: string,
  orderRef: string,
  items: OrderItemInfo[]
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set. Email not sent.");
    return { error: "RESEND_API_KEY not configured" };
  }

  // En développement / test, Resend utilise onboarding@resend.dev vers des adresses vérifiées.
  // En production, il faut configurer un domaine (ex: contact@skacademia.sn)
  const senderEmail = process.env.RESEND_SENDER_EMAIL || "SK Academia <onboarding@resend.dev>";
  
  const itemsHtml = items.map(item => `
    <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #1b508f;">${item.product_name}</h3>
      <a href="${item.download_url}" style="display: inline-block; background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
        📥 Télécharger le document
      </a>
      <p style="font-size: 12px; color: #666; margin-top: 10px;">
        <em>Ce lien expire dans 7 jours.</em>
      </p>
    </div>
  `).join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #1b508f;">Merci pour votre achat sur SK Academia !</h2>
      <p>Bonjour ${customerName || "Étudiant"},</p>
      <p>Votre paiement pour la commande <strong>${orderRef}</strong> a été validé avec succès.</p>
      
      <p>Vous pouvez télécharger vos documents en utilisant les liens ci-dessous :</p>
      
      ${itemsHtml}
      
      <p style="margin-top: 30px;">
        Si vous avez créé un compte, vous pouvez également retrouver ces documents à tout moment dans la rubrique <strong>Mes Téléchargements</strong> de votre espace personnel.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
      
      <p style="font-size: 12px; color: #999;">
        Besoin d'aide ? Contactez-nous à support@skacademia.sn<br/>
        L'équipe SK Academia
      </p>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: senderEmail,
      to: toEmail,
      subject: `Vos documents SK Academia - Commande ${orderRef}`,
      html: html,
    });
    
    return { data, error: null };
  } catch (error) {
    console.error("Failed to send email with Resend:", error);
    return { data: null, error };
  }
}
