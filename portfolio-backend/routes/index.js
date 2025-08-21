const express = require('express');
const router = express.Router();

// Ana sayfa route'u
router.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API çalışıyor!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      projects: '/api/projects',
      skills: '/api/skills',
      contact: '/api/contact'
    }
  });
});

// Health check route'u
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router; 