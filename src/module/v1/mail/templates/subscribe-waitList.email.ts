import { ISubscribeToWaitListEmailTemplate } from 'src/common/interfaces/email-templates.interface';

export function SubscribeToWaitListTemplate(
  data: ISubscribeToWaitListEmailTemplate,
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>🌱 Join the Green Revolution | GreenBounty Waitlist</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .content { 
          padding: 25px; 
          background: #f9f9f9; 
          border-radius: 12px; 
          margin-top: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .highlight { color: #4CAF50; font-weight: bold; }
        .benefits-list { 
          background: #e8f5e9; 
          padding: 20px; 
          border-radius: 8px;
          margin: 15px 0;
        }
        .benefits-list li { 
          margin: 10px 0;
          padding-left: 25px;
          position: relative;
        }
        .benefits-list li:before {
          content: "🌟";
          position: absolute;
          left: 0;
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding: 20px;
          color: #666;
          border-top: 2px solid #e8f5e9;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌿 Welcome, ${data.name}</h1>
        <p>You're Now Part of the GreenBounty Community</p>
      </div>
      
      <div class="content">
        <h2>Your Bounty-Journey Begins Here!</h2>
        
        <p>Welcome to the <span class="highlight">GreenBounty Pioneer Community</span>! Your commitment to environmental sustainability puts you at the forefront of positive change.</p>
        
        <div class="benefits-list">
          <h3>Your VIP Benefits:</h3>
          <ul>
            <li>First Access to Platform Launch</li>
            <li>Exclusive Pioneer Member Rewards</li>
            <li>Priority Registration Benefits</li>
            <li>Special Environmental Impact Features</li>
            <li>Early Bird Bonus Rewards</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <p>🌿 Turning Trash into Treasure 🌿</p>
        <p><strong>The GreenBounty Team</strong></p>
        <small>Connect with us on social media for eco-tips and updates</small>
      </div>
    </body>
    </html>
  `;
}
