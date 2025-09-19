import { useState, useEffect } from 'react';

export interface Education {
  _id: string;
  title: string;
  institution: string;
  period: string;
  type: 'education' | 'certificate' | 'course' | 'workshop';
  description?: string;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEducationData {
  title: string;
  institution: string;
  period: string;
  type: 'education' | 'certificate' | 'course' | 'workshop';
  description?: string;
  isActive?: boolean;
  priority?: number;
}

export interface UpdateEducationData extends Partial<CreateEducationData> {}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useEducation = () => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tüm eğitim bilgilerini getir
  const fetchEducation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/education`);
      const data = await response.json();
      
      if (data.success) {
        setEducation(data.data);
      } else {
        throw new Error(data.error || 'Eğitim bilgileri getirilemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Yeni eğitim bilgisi ekle
  const createEducation = async (educationData: CreateEducationData): Promise<Education | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const newEducation = data.data;
        setEducation(prev => [newEducation, ...prev]);
        return newEducation;
      } else {
        throw new Error(data.error || 'Eğitim bilgisi eklenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eğitim bilgisi eklenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Eğitim bilgisini güncelle
  const updateEducation = async (id: string, educationData: UpdateEducationData): Promise<Education | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/education/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedEducation = data.data;
        setEducation(prev => prev.map(edu => 
          edu._id === id ? updatedEducation : edu
        ));
        return updatedEducation;
      } else {
        throw new Error(data.error || 'Eğitim bilgisi güncellenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eğitim bilgisi güncellenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Eğitim bilgisini sil
  const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/education/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEducation(prev => prev.filter(edu => edu._id !== id));
        return true;
      } else {
        throw new Error(data.error || 'Eğitim bilgisi silinemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eğitim bilgisi silinirken hata oluştu');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Component mount olduğunda eğitim bilgilerini getir
  useEffect(() => {
    fetchEducation();
  }, []);

  return {
    education,
    loading,
    error,
    fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation,
  };
};
