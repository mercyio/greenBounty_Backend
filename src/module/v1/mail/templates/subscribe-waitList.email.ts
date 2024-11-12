import { ISubscribeToWaitListEmailTemplate } from 'src/common/interfaces/email-templates.interface';

export function SubscribeToWaitListTemplate(
  data: ISubscribeToWaitListEmailTemplate,
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to GreenBounty Waitlist!</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 8px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌱 Welcome to GreenBounty, ${data.name}! 🌱</h1>
      </div>
      
      <div class="content">
        <h2>You're Now Part of Something Special!</h2>
        
        <p>We're excited to have you join our waitlist. Your commitment to environmental sustainability is inspiring, and we can't wait to help you make a bigger impact.</p>
        
        <p>What's Next?</p>
        <ul>
          <li>You'll be among the first to know when we launch</li>
          <li>Exclusive early access to special features</li>
          <li>Priority registration when spots open up</li>
        </ul>

        <p>Stay tuned for exciting updates and eco-friendly tips coming your way!</p>
      </div>

      <div class="footer">
       
        <p>The GreenBounty Team</p>
        <small>Follow us on social media for more updates</small>
      </div>
    </body>
    </html>
  `;
}
