const express = require('express');
const router = express.Router();
const { Education } = require('../models');

// Tüm eğitim bilgilerini getir
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ priority: -1, createdAt: 1 });
    res.json({
      success: true,
      data: education,
      count: education.length
    });
  } catch (error) {
    console.error('Education getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Eğitim bilgileri getirilirken bir hata oluştu'
    });
  }
});

// ID'ye göre eğitim bilgisi getir
router.get('/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Eğitim bilgisi bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: education
    });
  } catch (error) {
    console.error('Education getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Eğitim bilgisi getirilirken bir hata oluştu'
    });
  }
});

// Yeni eğitim bilgisi ekle
router.post('/', async (req, res) => {
  try {
    const education = new Education(req.body);
    const savedEducation = await education.save();
    
    res.status(201).json({
      success: true,
      data: savedEducation,
      message: 'Eğitim bilgisi başarıyla eklendi'
    });
  } catch (error) {
    console.error('Education ekleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Eğitim bilgisi eklenirken bir hata oluştu'
    });
  }
});

// Eğitim bilgisini güncelle
router.put('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Eğitim bilgisi bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: education,
      message: 'Eğitim bilgisi başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Education güncelleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Eğitim bilgisi güncellenirken bir hata oluştu'
    });
  }
});

// Eğitim bilgisini sil
router.delete('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    
    if (!education) {
      return res.status(404).json({
        success: false,
        error: 'Eğitim bilgisi bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Eğitim bilgisi başarıyla silindi',
      data: education
    });
  } catch (error) {
    console.error('Education silme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Eğitim bilgisi silinirken bir hata oluştu'
    });
  }
});

// Tipe göre eğitim bilgilerini getir
router.get('/type/:type', async (req, res) => {
  try {
    const education = await Education.find({ 
      type: req.params.type 
    }).sort({ startDate: -1 });
    
    res.json({
      success: true,
      data: education,
      count: education.length
    });
  } catch (error) {
    console.error('Type education getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Tip eğitim bilgileri getirilirken bir hata oluştu'
    });
  }
});

module.exports = router;
