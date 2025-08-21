'use client';
import { useEducation } from '@/hooks/useEducation';
import EducationCertificates from '@/components/EducationCertificates';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function EducationPage() {
  const t = useTranslations('education');
  const { education, loading: educationLoading, error: educationError, fetchEducation } = useEducation();
  useEffect(() => {
    fetchEducation();
  }, []);


  return (
    <div className="bg-bg-primary min-h-screen w-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-card to-secondary border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground font-GoogleSansCode-Medium">
                {t('educationTitle')}
              </h1>
              <p className="text-muted font-GoogleSansCode-Light mt-2">
                {t('description')}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <EducationCertificates items={education || []} fullHeight={true} />
        </div>
      </div>
    </div>
  );
} 