import React from 'react'
import ProjectCart from './ProjectCart'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GitHubRepo } from '../../types/GitHubRepo';
import { useLocale, useTranslations } from 'next-intl';

interface ProjectsProps {
    repos: GitHubRepo[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}
const Projects = ({ repos, loading, error, refetch }: ProjectsProps) => {
    const t = useTranslations('projects');
    const locale = useLocale();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <motion.div
            className='flex flex-col text-foreground font-FunnelSans-Medium w-full items-center overflow-hidden'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className='text-3xl font-bold mt-6 text-center h-[10vh] sm:h-[8vh] md:h-[8vh] lg:h-auto'
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {t('projectsTitle')}
            </motion.h1>
            <motion.div
                className='flex flex-col sm:flex-row md:flex-row lg:flex-row items-center justify-between w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[90vw] h-auto lg:h-[50vh] gap-4 sm:gap-3 md:gap-2 lg:gap-0'
                variants={itemVariants}
            >
                {/* Küçük telefonlarda 1, tablet ve büyük telefonlarda 2, masaüstünde 4 proje göster */}
                {repos.slice(0, 1).map((repo, index) => (
                    <motion.div
                        key={index}
                        className="block sm:hidden"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <ProjectCart repo={repo} />
                    </motion.div>
                ))}
                
                {repos.slice(0, 2).map((repo, index) => (
                    <motion.div
                        key={index}
                        className="hidden sm:block lg:hidden"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <ProjectCart repo={repo} />
                    </motion.div>
                ))}
                
                {/* Masaüstünde tüm projeleri göster */}
                {repos.slice(0, 4).map((repo, index) => (
                    <motion.div
                        key={index}
                        className="hidden lg:block"
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <ProjectCart repo={repo} />
                    </motion.div>
                ))}
            </motion.div>
            <Link href={`/${locale}/projects`}>
                <motion.button
                    className='bg-accent hover:bg-accent-light text-card cursor-pointer px-6 py-3 rounded-md font-GoogleSansCode-Medium transition-all duration-300 transform hover:scale-105 mb-6 mt-6'
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                >
                    {t('viewAll')}
                </motion.button>
            </Link>
        </motion.div>
    )
}

export default Projects
