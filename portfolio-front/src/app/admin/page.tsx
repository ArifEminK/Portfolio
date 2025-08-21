'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminCredentials {
  username: string;
  password: string;
}

interface AdminData {
  totalSkills: number;
  totalEducation: number;
}

interface MainPageContent {
  greeting: string;
  description: string;
  animatedTexts: string[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState<AdminCredentials>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminData, setAdminData] = useState<AdminData>({
    totalSkills: 0,
    totalEducation: 0
  });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skills' | 'education' | 'content'>('dashboard');
  const [mainPageContent, setMainPageContent] = useState<MainPageContent>({
    greeting: "Merhaba, ben Arif Emin Köklü!",
    description: "Merhaba! Ben Arif Emin Köklü, Samsun Üniversitesi Yazılım Mühendisliği bölümünden mezunum. Mobil uygulama ve modern web uygulamaları geliştirme alanında tutkulu bir yazılımcıyım. Çeşitli projeler ve stajlarla yazılım deneyimimi güçlendirdim ve özellikle React, C#, Python, JavaScript ve TypeScript gibi teknolojilerde uzmanlaştım. Kendimi sürekli geliştirmeye ve yenilikçi çözümler üretmeye adıyorum.",
    animatedTexts: [
      "Merhaba, ben Arif Emin Köklü!",
      "Ben bir Yazılım Mühendisiyim.",
      "Frontend ve Backend teknolojileri ile ilgiliyim.",
      "Modern web ve mobil uygulamalar geliştiriyorum."
    ]
  });

  const router = useRouter();

  // Admin credentials (production'da bu bilgiler environment variables'da olmalı)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    router.push('/admin/dashboard');
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      fetchAdminData();
    } else {
      setError('Geçersiz kullanıcı adı veya şifre!');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setCredentials({ username: '', password: '' });
  };

  const fetchAdminData = async () => {
    try {
      // Simulate API calls
      const mockData: AdminData = {
        totalSkills: 25,
        totalEducation: 8
      };
      setAdminData(mockData);
    } catch (error) {
      console.error('Admin data fetch error:', error);
    }
  };

  const handleContentUpdate = (field: keyof MainPageContent, value: string | string[]) => {
    setMainPageContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveContent = async () => {
    try {
      // Burada API çağrısı yapılacak
      console.log('Ana sayfa içeriği güncellendi:', mainPageContent);
      alert('Ana sayfa içeriği başarıyla güncellendi!');
    } catch (error) {
      console.error('Content update error:', error);
      alert('Güncelleme sırasında hata oluştu!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-primary-dark)] p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-foreground)] mb-2">
              Portfolio Admin
            </h1>
            <p className="text-[var(--color-muted)]">
              Yönetim paneline erişim için giriş yapın
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-[var(--color-card)] rounded-2xl p-8 shadow-2xl border border-[var(--color-border)]">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200"
                  placeholder="Kullanıcı adınızı girin"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[var(--color-foreground)] mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all duration-200"
                  placeholder="Şifrenizi girin"
                  required
                />
              </div>

              {error && (
                <div className="bg-[var(--color-danger)]/20 border border-[var(--color-danger)] text-[var(--color-danger)] px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] text-white font-semibold py-3 px-6 rounded-lg hover:from-[var(--color-accent-light)] hover:to-[var(--color-accent)] transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-foreground)]">
      {/* Header */}
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
              Portfolio Admin Panel
            </h1>
            <span className="px-3 py-1 bg-[var(--color-success)] text-white text-xs rounded-full">
              Aktif
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[var(--color-danger)] text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Çıkış Yap
          </button>
        </div>
      </header>
    </div>
  );
}
