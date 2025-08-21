'use client';

import { useEffect } from 'react';
import Skills from '@/components/Skills';
import AnimatedText from '@/components/AnimatedText';
import EducationCertificates from '@/components/EducationCertificates';
import Link from 'next/link';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';
import useGitHubRepos from '@/hooks/useGitHubRepos';
import { useMainPage } from '@/hooks/useMainPage';
import { useEducation } from '@/hooks/useEducation';
import { useSkills } from '@/hooks/useSkills';
import { useTranslations, useLocale } from 'next-intl';

export default function Page() {
  const t = useTranslations('home');
  const locale = useLocale();
  const { repos, loading, error, refetch } = useGitHubRepos('ArifEminK', true);
  const { mainPageData, loading: mainPageLoading, error: mainPageError, fetchMainPage, updateMainPageContent, addAnimatedText, updateAnimatedText } = useMainPage();
  const { education, loading: educationLoading, error: educationError, fetchEducation } = useEducation();
  const { skills, loading: skillsLoading, error: skillsError, fetchSkills } = useSkills();

  // Locale değiştiğinde verileri yeniden çek
  useEffect(() => {
    if (locale) {
      fetchMainPage(locale);
    }
  }, [locale]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      className="bg-bg-primary h-full w-full min-w-0 overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex flex-col lg:flex-row bg-gradient-to-b from-card to-secondary items-center justify-center min-h-[75vh] lg:h-[75vh] border-b border-border px-4 lg:px-0 w-full overflow-x-hidden"
        variants={sectionVariants}
      >
        <div className="flex flex-col items-center w-full sm:w-[90vw] md:w-[80vw] lg:w-[60vw] h-full justify-center text-center sm:text-left mb-4 sm:mb-6 md:mb-8 lg:mb-0 px-2 sm:px-0">
          <AnimatedText
            texts={mainPageData?.animatedTexts?.map(text => text.text[locale as keyof typeof text.text]) || []}
            interval={3000}
          />
          <motion.h1
            className="text-xs sm:text-sm md:text-base lg:text-lg font-bold ml-0 sm:ml-2 md:ml-4 lg:ml-8 mt-4 sm:mt-6 md:mt-8 lg:mt-16 text-muted border-l-2 border-foreground px-2 font-GoogleSansCode-Light text-left max-w-full sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-none leading-relaxed"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {mainPageData?.description?.[locale as keyof typeof mainPageData.description]}
          </motion.h1>
          <motion.div
            className='flex flex-row gap-4 sm:gap-6 md:gap-8 mt-3 sm:mt-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              onClick={() => {
                window.open('/cv4.pdf', '_blank');
              }}
              className="bg-foreground hover:bg-muted cursor-pointer text-card px-4 py-2 rounded-md font-GoogleSansCode-Medium mt-2 transition-all duration-300 transform hover:scale-105"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t('downloadCV')}
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col items-center justify-center w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw] h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.img
            src={mainPageData?.profilePhotoUrl}
            alt="profile"
            className="w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[25vw] h-auto max-h-[70vw] sm:max-h-[60vw] md:max-h-[50vw] lg:max-h-[25vw] rounded-full border-4 sm:border-6 md:border-8 lg:border-8 border-muted shadow-2xl shadow-card object-cover mb-6"
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3 }
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        id='educationCertificates'
        className='bg-secondary h-full w-full flex flex-col lg:flex-row font-FunnelSans-Medium text-foreground items-start justify-between border-b border-border overflow-x-hidden'
        variants={sectionVariants}
      >
        <div className='flex-1 lg:flex-1/3 flex border-b lg:border-r h-full items-start justify-center border-border lg:border-b-0'>
          <div className='w-full h-full flex flex-col'>
            <motion.h1
              className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-center'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('educationTitle')}
            </motion.h1>
            <EducationCertificates items={education || []} maxItems={3} />
            <div className='flex justify-center mb-6'>
              <Link href={`/${locale}/education`}>
                <motion.button
                  className="bg-foreground hover:bg-muted text-card cursor-pointer px-6 py-3 rounded-md font-GoogleSansCode-Medium transition-all duration-300 transform hover:scale-105"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('viewAll')}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex-1 lg:flex-1/3 flex border-b lg:border-r h-full items-start justify-center border-border lg:border-b-0'>
          <div className='w-full h-full flex flex-col'>
            <motion.h1
              className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-center'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('skillsTitle')}
            </motion.h1>
            <Skills items={skills || []} />
            <div className='flex justify-center mb-6'>
              <Link href={`/${locale}/skills`}>
                <motion.button
                  className="bg-foreground hover:bg-muted text-card cursor-pointer px-6 py-3 rounded-md font-GoogleSansCode-Medium transition-all duration-300 transform hover:scale-105"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('viewAll')}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        id='projects'
        className='flex flex-col lg:flex-row bg-secondary sm:min-h-[80vh] md:min-h-[70vh] lg:h-[70vh] border-b border-border w-full overflow-x-hidden'
        variants={sectionVariants}
      >
        <Projects repos={repos} loading={loading} error={error} refetch={refetch} />
      </motion.div>

      <motion.div
        id='contact'
        className='flex flex-col lg:flex-row bg-secondary h-full w-full overflow-x-hidden'
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>
    </motion.div>
  );
}
