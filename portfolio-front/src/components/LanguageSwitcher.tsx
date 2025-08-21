"use client"
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/app/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleLanguageChange = (newLocale: string) => {
    // Mevcut path'i yeni locale ile güncelle
    const segments = pathname.split('/');
    segments[1] = newLocale; // [1] index'i locale segment'i
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getCurrentLanguageLabel = () => {
    switch (locale) {
      case 'tr': return 'TR';
      case 'en': return 'EN';
      case 'de': return 'DE';
      default: return 'TR';
    }
  };

  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'tr': return 'Türkçe';
      case 'en': return 'English';
      case 'de': return 'Deutsch';
      default: return lang.toUpperCase();
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-md text-sm font-medium bg-secondary text-muted hover:bg-muted hover:text-foreground transition-all duration-300"
      >
        <span>{getCurrentLanguageLabel()}</span>
        <FaArrowDownLong />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                  locale === l 
                    ? 'bg-foreground text-card' 
                    : 'text-muted hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{getLanguageName(l)}</span>
                  <span className="text-xs font-mono">{l.toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
