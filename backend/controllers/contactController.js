const nodemailer = require("nodemailer");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject: `New Contact Message from ${name}`,

      html: `
        <h2>New Contact Message</h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${message}
        </p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("Contact email error:", error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

module.exports = { sendContactMessage };