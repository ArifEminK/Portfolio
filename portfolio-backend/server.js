const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const contactRoute = require('./routes/contact');

// MongoDB bağlantısını import et
const connectDB = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB'ye bağlan
connectDB();

// Route'ları import et
const indexRoutes = require('./routes/index');
const skillRoutes = require('./routes/skills');
const educationRoutes = require('./routes/education');
const contactRoutes = require('./routes/contact');
const mainPageRoutes = require('./routes/mainPage');

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/mainpage', mainPageRoutes);
app.use('/api/contact', contactRoute);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Bir şeyler ters gitti!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Sayfa bulunamadı' });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 