const express = require('express');
const router = express.Router();
const { Skill } = require('../models');

// Tüm becerileri getir
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ priority: -1, createdAt: -1 });
    res.json({
      success: true,
      data: skills,
      count: skills.length
    });
  } catch (error) {
    console.error('Skills getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Beceriler getirilirken bir hata oluştu'
    });
  }
});

// ID'ye göre beceri getir
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Beceri bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Skill getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Beceri getirilirken bir hata oluştu'
    });
  }
});

// Yeni beceri ekle
router.post('/', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    
    res.status(201).json({
      success: true,
      data: savedSkill,
      message: 'Beceri başarıyla eklendi'
    });
  } catch (error) {
    console.error('Skill ekleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Beceri eklenirken bir hata oluştu'
    });
  }
});

// Beceri güncelle
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Beceri bulunamadı'
      });
    }
    
    res.json({
      success: true,
      data: skill,
      message: 'Beceri başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Skill güncelleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Beceri güncellenirken bir hata oluştu'
    });
  }
});

// Beceri sil
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Beceri bulunamadı'
      });
    }
    
    res.json({
      success: true,
      message: 'Beceri başarıyla silindi',
      data: skill
    });
  } catch (error) {
    console.error('Skill silme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Beceri silinirken bir hata oluştu'
    });
  }
});

// Kategoriye göre becerileri getir
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ 
      type: req.params.category,
      isActive: true 
    }).sort({ level: 1, title: 1 });
    
    res.json({
      success: true,
      data: skills,
      count: skills.length
    });
  } catch (error) {
    console.error('Category skills getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Kategori becerileri getirilirken bir hata oluştu'
    });
  }
});

module.exports = router;
