import { ISubscribeToWaitListEmailTemplate } from '../../../../common/interfaces/email-templates.interface';

export function SubscribeToWaitListTemplate(
  data: ISubscribeToWaitListEmailTemplate,
) {
  return `
    <!DOCTYPE html>
<html>
<head>
  <title>WaitList Confirmation</title>
</head>
<body>
  <h1>Welcome, ${data.name}!</h1>
  <p>Thank you for subscribing to our waitList. We are excited to have you on board.</p>
   <p>We'll keep you updated as soon as we have more news to share and when spots open up. Stay tuned!</p>
  <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
  <p>Best regards,</p>
  <p>GreenBounty</p>
</body>
</html>
    `;
}
