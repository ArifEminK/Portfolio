import { useState, useEffect, useCallback } from 'react';

export interface AnimatedText {
  _id: string;
  text: {
    tr: string;
    en: string;
    de: string;
  };
  order: number;
  isActive: boolean;
}

export interface MainPageData {
  _id: string;
  locale: string;
  greeting: {
    tr: string;
    en: string;
    de: string;
  };
  description: {
    tr: string;
    en: string;
    de: string;
  };
  profilePhotoUrl: string;
  animatedTexts: AnimatedText[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMainPageContent {
  greeting?: string | {
    tr?: string;
    en?: string;
    de?: string;
  };
  description?: string | {
    tr?: string;
    en?: string;
    de?: string;
  };
  profilePhotoUrl?: string;
}

export interface CreateAnimatedText {
  text: string | {
    tr: string;
    en: string;
    de: string;
  };
}

export interface UpdateAnimatedText {
  text?: string | {
    tr?: string;
    en?: string;
    de?: string;
  };
  order?: number;
  isActive?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useMainPage = () => {
  const [mainPageData, setMainPageData] = useState<MainPageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ana sayfa verilerini getir (locale parametresi ile)
  const fetchMainPage = useCallback(async (locale: string = 'tr') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/mainpage/${locale}`);
      const data = await response.json();
      
      if (data.success) {
        setMainPageData(data.data);
      } else {
        throw new Error(data.error || 'Ana sayfa verileri getirilemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  }, []);

  // Ana sayfa içeriğini güncelle (locale parametresi ile)
  const updateMainPageContent = useCallback(async (contentData: UpdateMainPageContent, locale: string = 'tr'): Promise<MainPageData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/mainpage/content/${locale}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedData = data.data;
        setMainPageData(updatedData);
        return updatedData;
      } else {
        throw new Error(data.error || 'Ana sayfa içeriği güncellenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ana sayfa içeriği güncellenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Yeni animasyonlu metin ekle (locale parametresi ile)
  const addAnimatedText = useCallback(async (textData: CreateAnimatedText, locale: string = 'tr'): Promise<MainPageData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/mainpage/animated-texts/${locale}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedData = data.data;
        setMainPageData(updatedData);
        return updatedData;
      } else {
        throw new Error(data.error || 'Animasyonlu metin eklenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Animasyonlu metin eklenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Animasyonlu metin güncelle (locale parametresi ile)
  const updateAnimatedText = useCallback(async (id: string, textData: UpdateAnimatedText, locale: string = 'tr'): Promise<MainPageData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/mainpage/animated-texts/${locale}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(textData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedData = data.data;
        setMainPageData(updatedData);
        return updatedData;
      } else {
        throw new Error(data.error || 'Animasyonlu metin güncellenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Animasyonlu metin güncellenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Animasyonlu metin sil (locale parametresi ile)
  const deleteAnimatedText = useCallback(async (id: string, locale: string = 'tr'): Promise<MainPageData | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/mainpage/animated-texts/${locale}/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedData = data.data;
        setMainPageData(updatedData);
        return updatedData;
      } else {
        throw new Error(data.error || 'Animasyonlu metin silinemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Animasyonlu metin silinirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Component mount olduğunda verileri getir (varsayılan olarak Türkçe)
  useEffect(() => {
    fetchMainPage('tr');
  }, []);

  return {
    mainPageData,
    loading,
    error,
    fetchMainPage,
    updateMainPageContent,
    addAnimatedText,
    updateAnimatedText,
    deleteAnimatedText,
  };
};
