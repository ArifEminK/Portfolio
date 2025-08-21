const express = require('express');
const router = express.Router();
const { MainPage } = require('../models');

// Ana sayfa içeriğini getir (locale parametresi ile)
router.get('/:locale', async (req, res) => {
  try {
    const { locale } = req.params;
    
    // Geçerli locale kontrolü
    if (!['tr', 'en', 'de'].includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz locale. Sadece tr, en, de desteklenir.'
      });
    }
    
    let mainPage = await MainPage.findOne({ locale, isActive: true });
    
    if (!mainPage) {
      // Varsayılan veri oluştur
      mainPage = new MainPage({
        locale: locale,
        greeting: {
          tr: 'Merhaba, ben Arif Emin Köklü',
          en: 'Hello, I am Arif Emin Köklü',
          de: 'Hallo, ich bin Arif Emin Köklü'
        },
        description: {
          tr: 'Full-stack web geliştirici olarak modern ve kullanıcı dostu web uygulamaları geliştiriyorum.',
          en: 'As a full-stack web developer, I develop modern and user-friendly web applications.',
          de: 'Als Full-Stack-Webentwickler entwickle ich moderne und benutzerfreundliche Webanwendungen.'
        },
        profilePhotoUrl: 'https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Profil+Foto',
        animatedTexts: [
          { 
            text: {
              tr: 'React.js ile modern web uygulamaları geliştiriyorum',
              en: 'I develop modern web applications with React.js',
              de: 'Ich entwickle moderne Webanwendungen mit React.js'
            },
            order: 1, 
            isActive: true 
          },
          { 
            text: {
              tr: 'Node.js backend sistemleri kuruyorum',
              en: 'I build Node.js backend systems',
              de: 'Ich baue Node.js Backend-Systeme'
            },
            order: 2, 
            isActive: true 
          },
          { 
            text: {
              tr: 'TypeScript ile tip güvenli kod yazıyorum',
              en: 'I write type-safe code with TypeScript',
              de: 'Ich schreibe typsicheren Code mit TypeScript'
            },
            order: 3, 
            isActive: true 
          }
        ]
      });
      await mainPage.save();
    }
    
    res.json({
      success: true,
      data: mainPage
    });
  } catch (error) {
    console.error('Main page getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Ana sayfa içeriği getirilemedi'
    });
  }
});

// Ana sayfa içeriğini güncelle (çok dilli)
router.put('/content/:locale', async (req, res) => {
  try {
    const { locale } = req.params;
    const { greeting, description, profilePhotoUrl } = req.body;
    
    // Geçerli locale kontrolü
    if (!['tr', 'en', 'de'].includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz locale. Sadece tr, en, de desteklenir.'
      });
    }
    
    let mainPage = await MainPage.findOne({ locale, isActive: true });
    
    if (!mainPage) {
      return res.status(404).json({
        success: false,
        error: 'Ana sayfa içeriği bulunamadı'
      });
    }
    
    // Sadece bu alanları güncelle
    if (greeting !== undefined) {
      if (typeof greeting === 'string') {
        // Tek dil güncelleme (geriye uyumluluk)
        mainPage.greeting[locale] = greeting;
      } else if (typeof greeting === 'object') {
        // Çok dilli güncelleme
        mainPage.greeting = { ...mainPage.greeting, ...greeting };
      }
    }
    
    if (description !== undefined) {
      if (typeof description === 'string') {
        // Tek dil güncelleme (geriye uyumluluk)
        mainPage.description[locale] = description;
      } else if (typeof description === 'object') {
        // Çok dilli güncelleme
        mainPage.description = { ...mainPage.description, ...description };
      }
    }
    
    if (profilePhotoUrl !== undefined) mainPage.profilePhotoUrl = profilePhotoUrl;
    
    const updatedMainPage = await mainPage.save();
    
    res.json({
      success: true,
      data: updatedMainPage,
      message: 'Ana sayfa içeriği başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Main page güncelleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Ana sayfa içeriği güncellenirken bir hata oluştu'
    });
  }
});

// Yeni animasyonlu metin ekle (çok dilli)
router.post('/animated-texts/:locale', async (req, res) => {
  try {
    const { locale } = req.params;
    const { text } = req.body;
    
    // Geçerli locale kontrolü
    if (!['tr', 'en', 'de'].includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz locale. Sadece tr, en, de desteklenir.'
      });
    }
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: 'Metin alanı gerekli'
      });
    }
    
    let mainPage = await MainPage.findOne({ locale, isActive: true });
    
    if (!mainPage) {
      return res.status(404).json({
        success: false,
        error: 'Ana sayfa içeriği bulunamadı'
      });
    }
    
    // Yeni metin ekle
    const newOrder = mainPage.animatedTexts.length > 0 
      ? Math.max(...mainPage.animatedTexts.map(t => t.order)) + 1 
      : 1;
    
    // Çok dilli metin yapısı
    const newText = {
      text: {
        tr: text.tr || text,
        en: text.en || text,
        de: text.de || text
      },
      order: newOrder,
      isActive: true
    };
    
    mainPage.animatedTexts.push(newText);
    
    const updatedMainPage = await mainPage.save();
    
    res.status(201).json({
      success: true,
      data: updatedMainPage,
      message: 'Animasyonlu metin başarıyla eklendi'
    });
  } catch (error) {
    console.error('Animated text ekleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Animasyonlu metin eklenirken bir hata oluştu'
    });
  }
});

// Animasyonlu metin güncelle (çok dilli)
router.put('/animated-texts/:locale/:id', async (req, res) => {
  try {
    const { locale, id } = req.params;
    const { text, order, isActive } = req.body;
    
    // Geçerli locale kontrolü
    if (!['tr', 'en', 'de'].includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz locale. Sadece tr, en, de desteklenir.'
      });
    }
    
    let mainPage = await MainPage.findOne({ locale, isActive: true });
    
    if (!mainPage) {
      return res.status(404).json({
        success: false,
        error: 'Ana sayfa içeriği bulunamadı'
      });
    }
    
    const textIndex = mainPage.animatedTexts.findIndex(t => t._id.toString() === id);
    
    if (textIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Animasyonlu metin bulunamadı'
      });
    }
    
    // Metni güncelle
    if (text !== undefined) {
      if (typeof text === 'string') {
        // Tek dil güncelleme (geriye uyumluluk)
        mainPage.animatedTexts[textIndex].text[locale] = text;
      } else if (typeof text === 'object') {
        // Çok dilli güncelleme
        mainPage.animatedTexts[textIndex].text = { ...mainPage.animatedTexts[textIndex].text, ...text };
      }
    }
    if (order !== undefined) mainPage.animatedTexts[textIndex].order = order;
    if (isActive !== undefined) mainPage.animatedTexts[textIndex].isActive = isActive;
    
    const updatedMainPage = await mainPage.save();
    
    res.json({
      success: true,
      data: updatedMainPage,
      message: 'Animasyonlu metin başarıyla güncellendi'
    });
  } catch (error) {
    console.error('Animated text güncelleme hatası:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validasyon hatası',
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Animasyonlu metin güncellenirken bir hata oluştu'
    });
  }
});

// Animasyonlu metin sil (çok dilli)
router.delete('/animated-texts/:locale/:id', async (req, res) => {
  try {
    const { locale, id } = req.params;
    
    // Geçerli locale kontrolü
    if (!['tr', 'en', 'de'].includes(locale)) {
      return res.status(400).json({
        success: false,
        error: 'Geçersiz locale. Sadece tr, en, de desteklenir.'
      });
    }
    
    let mainPage = await MainPage.findOne({ locale, isActive: true });
    
    if (!mainPage) {
      return res.status(404).json({
        success: false,
        error: 'Ana sayfa içeriği bulunamadı'
      });
    }
    
    const textIndex = mainPage.animatedTexts.findIndex(t => t._id.toString() === id);
    
    if (textIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Animasyonlu metin bulunamadı'
      });
    }
    
    // Metni sil
    mainPage.animatedTexts.splice(textIndex, 1);
    
    // Sıralamayı yeniden düzenle
    mainPage.animatedTexts.forEach((text, index) => {
      text.order = index + 1;
    });
    
    const updatedMainPage = await mainPage.save();
    
    res.json({
      success: true,
      data: updatedMainPage,
      message: 'Animasyonlu metin başarıyla silindi'
    });
  } catch (error) {
    console.error('Animated text silme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Animasyonlu metin silinirken bir hata oluştu'
    });
  }
});

// Tüm dillerdeki ana sayfa verilerini getir
router.get('/all/locales', async (req, res) => {
  try {
    const mainPages = await MainPage.find({ isActive: true }).sort({ locale: 1 });
    
    res.json({
      success: true,
      data: mainPages,
      count: mainPages.length
    });
  } catch (error) {
    console.error('All locales getirme hatası:', error);
    res.status(500).json({
      success: false,
      error: 'Tüm dillerdeki veriler getirilemedi'
    });
  }
});

module.exports = router;
