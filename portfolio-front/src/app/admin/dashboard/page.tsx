'use client';

import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSkills, CreateSkillData } from '@/hooks/useSkills';
import { useEducation, CreateEducationData } from '@/hooks/useEducation';
import { useMainPage, UpdateMainPageContent, CreateAnimatedText } from '@/hooks/useMainPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboard() {
  const { logout } = useAdminAuth();
  const { skills, loading: skillsLoading, error: skillsError, createSkill } = useSkills();
  const { education, loading: educationLoading, error: educationError, createEducation } = useEducation();
  const { 
    mainPageData, 
    loading: mainPageLoading, 
    error: mainPageError, 
    fetchMainPage,
    updateMainPageContent, 
    addAnimatedText, 
    deleteAnimatedText 
  } = useMainPage();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLocale, setSelectedLocale] = useState('tr');
  
  // Skill form state
  const [skillForm, setSkillForm] = useState<CreateSkillData>({
    title: '',
    type: 'language',
    level: 'beginner',
    description: '',
    yearsOfExperience: 0,
    isActive: true
  });

  // Education form state
  const [educationForm, setEducationForm] = useState<CreateEducationData>({
    title: '',
    institution: '',
    period: '',
    type: 'education',
    description: '',
    isActive: true,
    priority: 1
  });

  // Main page content state (çok dilli)
  const [mainPageForm, setMainPageForm] = useState<UpdateMainPageContent>({
    greeting: {
      tr: '',
      en: '',
      de: ''
    },
    description: {
      tr: '',
      en: '',
      de: ''
    },
    profilePhotoUrl: ''
  });

  // New animated text state (çok dilli)
  const [newAnimatedText, setNewAnimatedText] = useState({
    tr: '',
    en: '',
    de: ''
  });

  // Skill form submit
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createSkill(skillForm);
      if (result) {
        // Form'u temizle
        setSkillForm({
          title: '',
          type: 'language',
          level: 'beginner',
          description: '',
          yearsOfExperience: 0,
          isActive: true
        });
        
        // Dashboard tab'ına geç
        setActiveTab('dashboard');
      }
    } catch (error) {
      console.error('Skill ekleme hatası:', error);
    }
  };

  // Education form submit
  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await createEducation(educationForm);
      if (result) {
        // Form'u temizle
        setEducationForm({
          title: '',
          institution: '',
          period: '',
          type: 'education',
          description: '',
          isActive: true,
          priority: 1
        });
        
        // Dashboard tab'ına geç
        setActiveTab('dashboard');
      }
    } catch (error) {
      console.error('Education ekleme hatası:', error);
    }
  };

  // Main page content submit (çok dilli)
  const handleMainPageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await updateMainPageContent(mainPageForm, selectedLocale);
      if (result) {
        // Form'u güncelle
        setMainPageForm({
          greeting: result.greeting,
          description: result.description,
          profilePhotoUrl: result.profilePhotoUrl
        });
        
        alert('Ana sayfa içeriği başarıyla güncellendi!');
      }
    } catch (error) {
      console.error('Main page güncelleme hatası:', error);
      alert('Ana sayfa içeriği güncellenirken hata oluştu!');
    }
  };

  // Add new animated text (çok dilli)
  const handleAddAnimatedText = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAnimatedText.tr.trim() || !newAnimatedText.en.trim() || !newAnimatedText.de.trim()) {
      alert('Lütfen tüm dillerde metin girin!');
      return;
    }
    
    try {
      const result = await addAnimatedText({ text: newAnimatedText }, selectedLocale);
      if (result) {
        setNewAnimatedText({ tr: '', en: '', de: '' });
        alert('Animasyonlu metin başarıyla eklendi!');
      }
    } catch (error) {
      console.error('Animasyonlu metin ekleme hatası:', error);
      alert('Animasyonlu metin eklenirken hata oluştu!');
    }
  };

  // Delete animated text (çok dilli)
  const handleDeleteAnimatedText = async (id: string) => {
    if (confirm('Bu animasyonlu metni silmek istediğinizden emin misiniz?')) {
      try {
        const result = await deleteAnimatedText(id, selectedLocale);
        if (result) {
          alert('Animasyonlu metin başarıyla silindi!');
        }
      } catch (error) {
        console.error('Animasyonlu metin silme hatası:', error);
        alert('Animasyonlu metin silinirken hata oluştu!');
      }
    }
  };

  // Update main page form when data changes
  useEffect(() => {
    if (mainPageData) {
      setMainPageForm({
        greeting: mainPageData.greeting,
        description: mainPageData.description,
        profilePhotoUrl: mainPageData.profilePhotoUrl
      });
    }
  }, [mainPageData]);

  // Fetch main page data when locale changes
  useEffect(() => {
    if (selectedLocale) {
      fetchMainPage(selectedLocale);
    }
  }, [selectedLocale]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'add-skill', name: 'Beceri Ekle', icon: '➕' },
                { id: 'add-education', name: 'Eğitim Ekle', icon: '🎓' },
                { id: 'main-page', name: 'Ana Sayfa', icon: '🏠' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
              
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Beceri İstatistikleri</h3>
                  {skillsLoading ? (
                    <p className="text-gray-500">Yükleniyor...</p>
                  ) : skillsError ? (
                    <p className="text-red-500">Hata: {skillsError}</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-blue-600">{skills.length}</p>
                      <p className="text-gray-600">Toplam Beceri</p>
                      <div className="text-sm text-gray-500">
                        <p>Gelişmiş: {skills.filter(s => s.level === 'advanced').length}</p>
                        <p>Orta: {skills.filter(s => s.level === 'intermediate').length}</p>
                        <p>Başlangıç: {skills.filter(s => s.level === 'beginner').length}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Eğitim İstatistikleri</h3>
                  {educationLoading ? (
                    <p className="text-gray-500">Yükleniyor...</p>
                  ) : educationError ? (
                    <p className="text-red-500">Hata: {educationError}</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-green-600">{education.length}</p>
                      <p className="text-gray-600">Toplam Eğitim/Sertifika</p>
                      <div className="text-sm text-gray-500">
                        <p>Eğitim: {education.filter(e => e.type === 'education').length}</p>
                        <p>Sertifika: {education.filter(e => e.type === 'certificate').length}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'add-skill' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Yeni Beceri Ekle</h2>
              
              <form onSubmit={handleSkillSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beceri Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={skillForm.title}
                    onChange={(e) => setSkillForm({...skillForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: React.js"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip *
                    </label>
                    <select
                      required
                      value={skillForm.type}
                      onChange={(e) => setSkillForm({...skillForm, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="language">Programlama Dili</option>
                      <option value="framework">Framework</option>
                      <option value="tool">Araç</option>
                      <option value="program">Program</option>
                      <option value="database">Veritabanı</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seviye *
                    </label>
                    <select
                      required
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({...skillForm, level: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Başlangıç</option>
                      <option value="intermediate">Orta</option>
                      <option value="advanced">Gelişmiş</option>
                      <option value="expert">Uzman</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={skillForm.description}
                    onChange={(e) => setSkillForm({...skillForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Beceri hakkında kısa açıklama..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deneyim Yılı
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={skillForm.yearsOfExperience}
                    onChange={(e) => setSkillForm({...skillForm, yearsOfExperience: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="skillActive"
                    checked={skillForm.isActive}
                    onChange={(e) => setSkillForm({...skillForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="skillActive" className="ml-2 block text-sm text-gray-900">
                    Aktif
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={skillsLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {skillsLoading ? 'Ekleniyor...' : 'Beceri Ekle'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'add-education' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Yeni Eğitim/Sertifika Ekle</h2>
              
              <form onSubmit={handleEducationSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    required
                    value={educationForm.title}
                    onChange={(e) => setEducationForm({...educationForm, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: Yazılım Mühendisliği"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kurum *
                  </label>
                  <input
                    type="text"
                    required
                    value={educationForm.institution}
                    onChange={(e) => setEducationForm({...educationForm, institution: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: Samsun Üniversitesi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dönem *
                    </label>
                    <input
                      type="text"
                      required
                      value={educationForm.period}
                      onChange={(e) => setEducationForm({...educationForm, period: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Örn: 2018-2022"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tip *
                    </label>
                    <select
                      required
                      value={educationForm.type}
                      onChange={(e) => setEducationForm({...educationForm, type: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="education">Eğitim</option>
                      <option value="certificate">Sertifika</option>
                      <option value="course">Kurs</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={educationForm.description}
                    onChange={(e) => setEducationForm({...educationForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Eğitim/sertifika hakkında detay..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Öncelik
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={educationForm.priority}
                      onChange={(e) => setEducationForm({...educationForm, priority: parseInt(e.target.value) || 1})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="educationActive"
                    checked={educationForm.isActive}
                    onChange={(e) => setEducationForm({...educationForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="educationActive" className="ml-2 block text-sm text-gray-900">
                    Aktif
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={educationLoading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {educationLoading ? 'Ekleniyor...' : 'Eğitim/Sertifika Ekle'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'main-page' && (
            <div className="max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Ana Sayfa İçeriği Düzenle</h2>
                
                {/* Dil Seçici */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Dil Seçin:</label>
                  <select
                    value={selectedLocale}
                    onChange={(e) => setSelectedLocale(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="tr">🇹🇷 Türkçe</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="de">🇩🇪 Deutsch</option>
                  </select>
                </div>
              </div>
              
              {mainPageLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Yükleniyor...</p>
                </div>
              ) : mainPageError ? (
                <div className="text-center py-8">
                  <p className="text-red-500">Hata: {mainPageError}</p>
                </div>
              ) : mainPageData ? (
                <div className="space-y-8">
                  {/* Temel İçerik Formu */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Temel İçerik - {selectedLocale.toUpperCase()}</h3>
                    
                    <form onSubmit={handleMainPageSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Karşılama Metni - {selectedLocale.toUpperCase()} *
                        </label>
                        <input
                          type="text"
                          required
                          value={typeof mainPageForm.greeting === 'string' ? mainPageForm.greeting : (mainPageForm.greeting as any)?.[selectedLocale] || ''}
                          onChange={(e) => setMainPageForm({
                            ...mainPageForm, 
                            greeting: {
                              ...(typeof mainPageForm.greeting === 'object' ? mainPageForm.greeting : { tr: '', en: '', de: '' }),
                              [selectedLocale]: e.target.value
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Karşılama metni (${selectedLocale.toUpperCase()})`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama - {selectedLocale.toUpperCase()} *
                        </label>
                        <textarea
                          required
                          value={typeof mainPageForm.description === 'string' ? mainPageForm.description : (mainPageForm.description as any)?.[selectedLocale] || ''}
                          onChange={(e) => setMainPageForm({
                            ...mainPageForm, 
                            description: {
                              ...(typeof mainPageForm.description === 'object' ? mainPageForm.description : { tr: '', en: '', de: '' }),
                              [selectedLocale]: e.target.value
                            }
                          })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Açıklama (${selectedLocale.toUpperCase()})`}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profil Fotoğrafı URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={mainPageForm.profilePhotoUrl}
                          onChange={(e) => setMainPageForm({...mainPageForm, profilePhotoUrl: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={mainPageLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {mainPageLoading ? 'Güncelleniyor...' : 'Temel İçeriği Güncelle'}
                      </button>
                    </form>
                  </div>

                  {/* Animasyonlu Metinler */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Animasyonlu Metinler</h3>
                    
                    {/* Mevcut Metinler */}
                    <div className="space-y-3 mb-6">
                      {mainPageData.animatedTexts.map((textItem, index) => (
                        <div key={textItem._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                          <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                          <input
                            type="text"
                            value={typeof textItem.text === 'string' ? textItem.text : textItem.text[selectedLocale as keyof typeof textItem.text] || ''}
                            disabled
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteAnimatedText(textItem._id)}
                            className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                            title="Bu metni sil"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Yeni Metin Ekleme */}
                    <form onSubmit={handleAddAnimatedText} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yeni Animasyonlu Metin Ekle (Çok Dilli)
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={newAnimatedText.tr}
                            onChange={(e) => setNewAnimatedText({...newAnimatedText, tr: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Türkçe metin..."
                          />
                          <input
                            type="text"
                            value={newAnimatedText.en}
                            onChange={(e) => setNewAnimatedText({...newAnimatedText, en: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="English text..."
                          />
                          <input
                            type="text"
                            value={newAnimatedText.de}
                            onChange={(e) => setNewAnimatedText({...newAnimatedText, de: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Deutscher Text..."
                          />
                        </div>
                        <div className="mt-3">
                          <button
                            type="submit"
                            disabled={mainPageLoading || !newAnimatedText.tr.trim() || !newAnimatedText.en.trim() || !newAnimatedText.de.trim()}
                            className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Ana sayfa verisi bulunamadı</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
