import React from 'react'

interface FooterProps {
    currentLocale: string;
}

const Footer = ({ currentLocale }: FooterProps) => {
    // Manuel çeviri
    const getBottomText = (locale: string) => {
        switch (locale) {
            case 'tr':
                return 'Tüm haklar satın alınmıştır.';
            case 'en':
                return 'All rights reserved.';
            case 'de':
                return 'Alle Rechte vorbehalten.';
            default:
                return 'Tüm haklar satın alınmıştır.';
        }
    };
    
    const bottomText = getBottomText(currentLocale);
    
    return (
        <div className='flex flex-row bg-bg-primary h-full w-full items-center justify-center border-t border-border'>
            <div className='w-[50vw] justify-items-end h-full'>
                <h1 className='text-foreground border-r p-[2vw] border-border font-FunnelSans-Bold text-2xl'>
                    Arif Emin Köklü
                </h1>
            </div>
            <div className='w-[50vw] h-full'>
                <h1 className='text-foreground font-FunnelSans-Light text-2xl border-l border-border p-[2vw]'>
                    {bottomText}
                </h1>
            </div>
        </div>
    )
}

export default Footer
