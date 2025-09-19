import { useState, useEffect } from 'react';

export interface Skill {
  _id: string;
  title: string;
  type: 'language' | 'tool' | 'program' | 'framework' | 'database';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
  yearsOfExperience?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillData {
  title: string;
  type: 'language' | 'tool' | 'program' | 'framework' | 'database';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description?: string;
  yearsOfExperience?: number;
  isActive?: boolean;
}

export interface UpdateSkillData extends Partial<CreateSkillData> {}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tüm becerileri getir
  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/skills`);
      const data = await response.json();
      
      if (data.success) {
        setSkills(data.data);
      } else {
        throw new Error(data.error || 'Beceriler getirilemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Yeni beceri ekle
  const createSkill = async (skillData: CreateSkillData): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const newSkill = data.data;
        setSkills(prev => [newSkill, ...prev]);
        return newSkill;
      } else {
        throw new Error(data.error || 'Beceri eklenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beceri eklenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Beceri güncelle
  const updateSkill = async (id: string, skillData: UpdateSkillData): Promise<Skill | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const updatedSkill = data.data;
        setSkills(prev => prev.map(skill => 
          skill._id === id ? updatedSkill : skill
        ));
        return updatedSkill;
      } else {
        throw new Error(data.error || 'Beceri güncellenemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beceri güncellenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Beceri sil
  const deleteSkill = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/skills/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSkills(prev => prev.filter(skill => skill._id !== id));
        return true;
      } else {
        throw new Error(data.error || 'Beceri silinemedi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Beceri silinirken hata oluştu');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Component mount olduğunda becerileri getir
  useEffect(() => {
    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};
