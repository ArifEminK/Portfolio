'use client';
import Skills from '@/components/Skills'
import { useSkills } from '@/hooks/useSkills';
import React, { useEffect } from 'react'
import { useTranslations } from 'next-intl';

const page = () => {
    const { skills, loading: skillsLoading, error: skillsError, fetchSkills } = useSkills();
    const t = useTranslations('skills');
    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className='bg-bg-primary min-h-screen w-full'>
            <div className="bg-gradient-to-b from-card to-secondary border-b border-border">
                <div className="container mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground font-GoogleSansCode-Medium">
                                {t('skillsTitle')}
                            </h1>
                            <p className="text-muted font-GoogleSansCode-Light mt-2">
                                {t('skillsDescription')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <Skills items={skills || []} fullHeight={true} />
                </div>
            </div>
        </div>
    )
}

export default page
