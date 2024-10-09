const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, email, phoneNumber, message } = req.body;
  const userPass = process.env.NODEMAILER_EMAIL_PASS;

  if (!name || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shakiranter@gmail.com",
      pass: userPass,
    },
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  });

  const mailOptions = {
    from: email,
    to: "shakiranter@gmail.com",
    subject: "Contact Form Submission from Calvin's Cart",
    text: message,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 20px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #333;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
            .header h2 {
              margin: 0;
            }
            .content {
              padding: 20px;
            }
            .content p {
              margin-bottom: 20px;
            }
            .footer {
              background-color: #333;
              color: #fff;
              padding: 10px;
              text-align: center;
              clear: both;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Contact Form Submission from Calvin's Cart</h2>
            </div>
            <div class="content">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <div class="footer">
              <p>&copy; 2023 Calvin's Cart</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({message: "Email sent successfully."})
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = {
  sendEmail,
};
