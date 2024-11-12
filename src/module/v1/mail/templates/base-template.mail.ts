import { EMAIL_CONSTANT } from '../../../../common/constants/email.constant';

export const baseTemplate = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const appName = EMAIL_CONSTANT.appName;
  const supportEmail = 'hello@greenBounty.ng';
  const address = 'Uyo, Nigeria';

  return `
 <!DOCTYPE html>
<html lang="en" dir="auto">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Inter:400"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
      }

      img {
        border: 0;
        height: auto;
        display: block;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        margin: 0;
      }

      /* Responsive Styles */
      @media only screen and (min-width: 599px) {
        .container {
          width: 568px !important;
          max-width: 568px;
        }
        .column-1 {
          width: 340px !important;
          max-width: 340px;
        }
        .column-2 {
          width: 504px !important;
          max-width: 504px;
        }
      }

      @media only screen and (max-width: 598px) {
        .container {
          width: 100% !important;
        }
        .responsive-img {
          max-width: 100% !important;
          height: auto !important;
        }
      }

      /* General Styles */
      .header,
      .footer {
        background-color: #fffffe;
        border-radius: 8px 8px 0 0;
      }

      .content {
        padding: 16px 24px;
        color: #646464;
        font-family: 'Inter', Arial, sans-serif;
        font-size: 16px;
        line-height: 150%;
      }

      .title {
        font-size: 35px;
        font-weight: 600;
        color: #202020;
        line-height: 114%;
        letter-spacing: -0.16px;
      }

      .button {
        background-color: #3e63dd;
        color: #ffffff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 4px;
        display: inline-block;
        margin: 20px 0;
      }

      .footer-text {
        font-size: 12px;
        color: #838383;
        line-height: 133%;
        letter-spacing: 0.04px;
      }

      a {
        color: #3e63dd;
        text-decoration: none;
      }

      /* Hide elements in Outlook */
      .outlook-hide {
        display: none !important;
        mso-hide: all;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Header -->
      <table align="center" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding: 40px 16px 24px 16px">
            // <img
            //   src="https://boifiok-aws-bucket.s3.eu-north-1.amazonaws.com/uploads/app-files/07ddc871-acc5-4b7e-96c4-84eb8627b104.png"
            //   alt="Logo"
            //   width="74"
            //   style="width: 74px"
            // />
          </td>
        </tr>
      </table>

      <!-- Main Content -->
      <table
        align="center"
        width="100%"
        class="header"
        cellpadding="0"
        cellspacing="0"
      >
        <tr>
          <td align="center" class="content">
            <h1 class="title">You now have a premium Basket!!</h1>
          </td>
        </tr>
      </table>

      <table align="center" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" class="content">
            <img
              src="https://e.hypermatic.com/56fe21b30c7461753d912b5905cbbefb.jpg"
              alt="Main Image"
              class="responsive-img"
              width="504"
            />
          </td>
        </tr>
      </table>

      <!-- content start -->
      ${content}
      <!-- content end -->

      <!-- Footer -->
      <table
        align="center"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        class="footer"
      >
        <tr>
          <td align="center" class="content">
            <p class="footer-text">You get questions?</p>
            <p class="footer-text">
              You fit reply this email or you contact
              <a href="mailto:${supportEmail}">${supportEmail}</a>
            </p>
            <p class="footer-text">Warm regards,</p>
            <p class="footer-text">The ${appName} Team</p>
          </td>
        </tr>
        <tr>
          <td align="center" class="content">
            <p class="footer-text">
              Terms & Conditions | Privacy Policy | Contact Us
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" class="content">
            <p class="footer-text">${address}</p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};
