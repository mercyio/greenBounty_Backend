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
  <h1>New Premium Subscription Alert</h1>
  <p>Dear Admin,</p>
  <p>A new premium subscription has been activated. Here are the details:</p>
  
  <h2>User Details</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">User Name</th>
      <td style="border: 1px solid #ddd; padding: 8px;">${data.user}</td>
    </tr>
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Basket Number</th>
      <td style="border: 1px solid #ddd; padding: 8px;">${data.basketNumber}</td>
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

  <p>Please process any necessary administrative actions for this new premium account.</p>

  <p>Thank you,<br>System Notification</p>
`;

  return baseTemplate({
    title: 'New Premium Subscription Alert',
    content: content,
  });
}
