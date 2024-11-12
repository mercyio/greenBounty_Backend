import { IVerifyEmailTemplate } from 'src/common/interfaces/email-templates.interface';

export function VerifyEmailTemplate(data: IVerifyEmailTemplate) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verify Your GreenBounty Email</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 25px; background: #f9f9f9; border-radius: 8px; margin-top: 20px; }
        .verification-code { 
          font-size: 32px; 
          letter-spacing: 5px;
          text-align: center;
          background: #e8f5e9;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          color: #2e7d32;
        }
        .timer { color: #f44336; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🌱 Verify Your Email</h1>
      </div>
      
      <div class="content">
        <h2>Welcome to GreenBounty, ${data.name}!</h2>
        
        <p>Your verification code is:</p>
        
        <div class="verification-code">
          ${data.code}
        </div>
        
        <p><span class="timer">⏰ This code expires in 5 minutes</span></p>
        
        <p>Enter this code to complete your email verification and start your eco-friendly journey with GreenBounty.</p>
      </div>

      <div class="footer">
          <p>🌿 Turning Trash into Treasure 🌿</p>
        <p>The GreenBounty Team</p>
      </div>
    </body>
    </html>
  `;
}
