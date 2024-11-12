import { IPremiumBasketTemplate } from '../../../../common/interfaces/email-templates.interface';
import { baseTemplate } from './base-template.mail';

export function premiumBasketEmailTemplate(data: IPremiumBasketTemplate) {
  const content = `
  <h1>Premium Account Upgrade Successful!</h1>
  <p>Hi ${data.user},</p>
  <p>Congratulations on upgrading to a premium account! Here are the details of your subscription:</p>
  
  <h2>Upgrade Details</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Basket Number</th>
      <td style="border: 1px solid #ddd; padding: 8px;">${
        data.basketNumber
      }</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Upgrade Date</th>
      <td style="border: 1px solid #ddd; padding: 8px;">${data.upgradeDate}</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Amount Paid</th>
      <td style="border: 1px solid #ddd; padding: 8px;">${data.currencySymbol}${data.totalAmount.toFixed(2)}</td>
    </tr>
  </table>

  <p>Thank you for choosing our premium services! We hope you enjoy the exclusive features that come with your subscription.</p>
  
  <p>If you have any questions, feel free to reach out to our support team.</p>

  <b>Level Up! You're Going Green in Premium Style 🌿</b>

  <p>Best regards,<br>Your Company Team</p>
`;

  return baseTemplate({
    title: 'Premium Account Upgrade Confirmation',
    content: content,
  });
}

export function premiumBasketNotificationEmailTemplate(
  data: IPremiumBasketTemplate,
) {
  const content = `
    <div class="premium-header">
      <h1>🌿 Welcome to GreenBounty Premium! </h1>
      <p class="tagline">Your Eco-Impact Just Got Supercharged</p>
    </div>

    <div class="premium-content">
      <p class="greeting">Hi ${data.user},</p>
      
      <div class="upgrade-details">
        <h2>Your Premium Details</h2>
        <div class="details-card">
          <div class="detail-row">
            <span class="label">Basket ID</span>
            <span class="value">${data.basketNumber}</span>
          </div>
          <div class="detail-row">
            <span class="label">Upgrade Date</span>
            <span class="value">${data.upgradeDate}</span>
          </div>
          <div class="detail-row highlight">
            <span class="label">Investment</span>
            <span class="value">${data.currencySymbol}${data.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="benefits-section">
        <h3>🌿 Your Premium Benefits</h3>
        <ul class="benefits-list">
          <li>Enhanced Recycling Rewards</li>
          <li>Priority Pickup Service</li>
          <li>Exclusive Environmental Impact Reports</li>
          <li>Premium Community Access</li>
        </ul>
      </div>

      <p class="support-note">Our dedicated support team is here to help you make the most of your premium features!</p>
    </div>
  `;

  const styles = `
    .premium-header { background: linear-gradient(135deg, #2E7D32, #388E3C); color: white; padding: 30px; border-radius: 12px; text-align: center; }
    .tagline { font-size: 1.2em; opacity: 0.9; }
    .premium-content { padding: 25px; }
    .details-card { background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 15px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
    .highlight { background: #E8F5E9; border-radius: 6px; padding: 12px; }
    .benefits-list { list-style: none; padding-left: 0; }
    .benefits-list li { padding: 8px 0 8px 25px; position: relative; }
    .benefits-list li:before { content: "✓"; position: absolute; left: 0; color: #2E7D32; }
    .support-note { background: #FFF3E0; padding: 15px; border-radius: 6px; margin-top: 20px; }
  `;

  return baseTemplate({
    title: ' Welcome to GreenBounty Premium',
    content: `<style>${styles}</style>${content}`,
  });
}

// export function premiumBasketNotificationEmailTemplate(
//   data: IPremiumBasketTemplate,
// ) {
//   const content = `
//   <h1>New Premium Subscription Alert</h1>
//   <p>Dear Admin,</p>
//   <p>A new premium subscription has been activated. Here are the details:</p>

//   <h2>User Details</h2>
//   <table style="width: 100%; border-collapse: collapse;">
//     <tr>
//       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">User Name</th>
//       <td style="border: 1px solid #ddd; padding: 8px;">${data.user}</td>
//     </tr>
//     <tr>
//       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Basket Number</th>
//       <td style="border: 1px solid #ddd; padding: 8px;">${data.basketNumber}</td>
//     </tr>
//     <tr>
//       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Upgrade Date</th>
//       <td style="border: 1px solid #ddd; padding: 8px;">${data.upgradeDate}</td>
//     </tr>
//     <tr>
//       <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Amount Paid</th>
//       <td style="border: 1px solid #ddd; padding: 8px;">${data.currencySymbol}${data.totalAmount}</td>
//     </tr>
//   </table>

//   <p>Please process any necessary administrative actions for this new premium account.</p>

//   <p>Thank you,<br>System Notification</p>
// `;

//   return baseTemplate({
//     title: 'New Premium Subscription Alert',
//     content: content,
//   });
