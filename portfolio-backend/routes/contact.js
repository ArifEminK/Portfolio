const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Ad, e-posta ve mesaj alanları gerekli' });
  }

  // Email validasyonu
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Geçerli bir e-posta adresi girin' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // başka SMTP kullanabilirsin
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio İletişim" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: subject ? `Portfolio İletişim - ${subject}` : `Yeni İletişim Mesajı - ${name}`,
      text: `
        İsim: ${name}
        E-posta: ${email}
        Konu: ${subject || 'Belirtilmemiş'}
        Mesaj: ${message}
      `,
    });

    res.status(200).json({ success: true, message: 'Mesaj gönderildi!' });
  } catch (err) {
    res.status(500).json({ error: 'Mesaj gönderilirken hata oluştu' });
  }
});

module.exports = router;
