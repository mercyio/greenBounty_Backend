import { IWelcomeEmailTemplate } from '../../../../common/interfaces/email-templates.interface';
export function welcomeEmailTemplate(data: IWelcomeEmailTemplate) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>🌱 Welcome to GreenBounty</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 30px; text-align: center; border-radius: 12px; }
        .content { padding: 25px; background: #f9f9f9; border-radius: 12px; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .highlight { color: #4CAF50; font-weight: bold; }
        .cta-button { background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌱 Welcome to GreenBounty, ${data.name}! 🌱</h1>
        <p>Your Journey Towards a Greener Future Starts Now</p>
      </div>
      
      <div class="content">
        <h2>Get Ready to Make an Impact!</h2>
        
        <p>We're excited to welcome you to the <span class="highlight">GreenBounty community</span> - where every eco-friendly action counts!</p>
        
        <h3>What's Next?</h3>
        <ul>
          <li>Complete your profile</li>
          <li>Explore recycling opportunities</li>
          <li>Start earning rewards</li>
          <li>Track your environmental impact</li>
        </ul>
        
        <p>Need help getting started? Our support team is here for you 24/7!</p>
      </div>

        <p>🌿 Turning Trash into Treasure 🌿</p>

      <div class="footer">
        <p>The GreenBounty Team</p>
        <small>Follow us on social media for eco-tips and updates</small>
      </div>
    </body>
    </html>
  `;
}
