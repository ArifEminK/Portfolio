"use client"
import Link from 'next/link'
import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

const TopBar = () => {
    const t = useTranslations('navigation');
    const locale = useLocale();
    
    const scrollToSection = (sectionId: string) => {
        const element = document.querySelector(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-between h-[100px] sm:h-[13vh] md:h-[14vh] lg:h-[15vh] bg-card border-b-2 border-border px-4 lg:px-0 w-full">
            <div className="flex flex-row items-center w-full sm:w-[50vw] lg:w-[50vw] justify-center sm:justify-start lg:justify-start mb-4 sm:mb-0 lg:mb-0">
                <Link href={`/${locale}`}>
                    <h1 className="text-3xl sm:text-4xl md:text-2xl lg:text-2xl mt-4 sm:mt-2 md:mt-0 lg:mt-0 sm:ml-[2vh] md:ml-[3vh] lg:ml-[5vh] font-bold text-muted hover:text-foreground transition-all duration-300 font-FunnelSans-Medium">
                        Arif Emin Köklü
                    </h1>
                </Link>
            </div>
            <div className="flex flex-row items-center w-full sm:w-[50vw] lg:w-[50vw] justify-center sm:justify-end lg:justify-end gap-1 sm:gap-2 md:gap-3 lg:gap-0 mb-4 lg:mb-0">
                <LanguageSwitcher />
                <button 
                    onClick={() => scrollToSection('#educationCertificates')} 
                    className="text-sm sm:text-sm md:text-lg lg:text-2xl mr-0 lg:mr-[5vh] font-bold text-muted cursor-pointer font-FunnelSans-Light hover:text-foreground transition-all duration-300 border-r-2 border-border px-2 sm:px-0 md:px-0 lg:px-6"
                >
                    <span className="hidden sm:inline">{t('education')}</span>
                    <span className="sm:hidden">{t('educationShort')}</span>
                </button>
                <button 
                    onClick={() => scrollToSection('#projects')} 
                    className="text-sm sm:text-sm md:text-lg lg:text-2xl mr-0 lg:mr-[5vh] font-bold text-muted cursor-pointer font-FunnelSans-Light hover:text-foreground transition-all duration-300 border-r-2 border-border px-2 sm:px-0 md:px-0 lg:pr-6"
                >
                    <span className="hidden sm:inline">{t('projects')}</span>
                    <span className="sm:hidden">{t('projectsShort')}</span>
                </button>
                <button 
                    onClick={() => scrollToSection('#contact')} 
                    className="text-sm sm:text-sm md:text-lg lg:text-2xl mr-0 lg:mr-[5vh] font-bold text-muted cursor-pointer font-FunnelSans-Light hover:text-foreground transition-all duration-300"
                >
                    {t('contact')}
                </button>
            </div>
        </div>
    )
}

export default TopBar
