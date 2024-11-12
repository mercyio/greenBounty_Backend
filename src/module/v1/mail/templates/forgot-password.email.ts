import { ISendResetPasswordEmailTemplate } from 'src/common/interfaces/email-templates.interface';
export function ForgotPasswordTemplate(data: ISendResetPasswordEmailTemplate) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Reset Your GreenBounty Password</title>
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
        .code-box {
          background: #e8f5e9;
          color: #2e7d32;
          font-size: 32px;
          font-weight: bold;
          text-align: center;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          letter-spacing: 5px;
        }
        .timer {
          color: #f44336;
          font-weight: bold;
          text-align: center;
          margin: 15px 0;
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
        <h1>🔐 Password Reset</h1>
      </div>
      
      <div class="content">
        <h2>Hello!</h2>
        
        <p>We received a request to reset your GreenBounty password. Here's your verification code:</p>
        
        <div class="code-box">
          ${data.code}
        </div>
        
        <div class="timer">
          ⏰ This code expires in 5 minutes
        </div>
        
        <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
      </div>

      <div class="footer">
           <p>🌿 Turning Trash into Treasure 🌿</p>
        <p><strong>The GreenBounty Team</strong></p>
      </div>
    </body>
    </html>
  `;
}
