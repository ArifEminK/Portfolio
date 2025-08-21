import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { GitHubRepo } from '../../types/GitHubRepo';

interface ProjectCartProps {
    repo: GitHubRepo | undefined;
}

const ProjectCart: React.FC<ProjectCartProps> = ({ repo }) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageError, setImageError] = useState<boolean>(false);

    useEffect(() => {
        if (!repo?.name) return;

        // Önce master branch'ten deneyecek
        const masterUrl = `https://raw.githubusercontent.com/ArifEminK/${repo.name}/refs/heads/master/main.png`;
        const mainUrl = `https://raw.githubusercontent.com/ArifEminK/${repo.name}/refs/heads/main/main.png`;

        // Master branch'ten yüklemeyi dene
        const img = new window.Image();
        img.onload = () => {
            setImageUrl(masterUrl);
        };
        img.onerror = () => {
            // Master yüklenemezse main branch'ten dene
            const mainImg = new window.Image();
            mainImg.onload = () => {
                setImageUrl(mainUrl);
            };
            mainImg.onerror = () => {
                setImageError(true);
            };
            mainImg.src = mainUrl;
        };
        img.src = masterUrl;
    }, [repo?.name]);

    if (!repo) {
        return (
            <motion.div 
                className='w-full h-[300px] bg-card rounded-2xl py-6 px-6 flex flex-col items-center justify-center border border-border'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className='w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[20vw] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] bg-card rounded-2xl py-3 sm:py-4 md:py-5 lg:py-6 px-3 sm:px-4 md:px-5 lg:px-4 flex flex-col items-center justify-between border border-border hover:border-accent transition-colors duration-300'
            whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 }
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div 
                className='w-20 h-20 rounded-lg overflow-visible bg-card-light flex items-center justify-center'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {imageError ? (
                    <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                        No Image
                    </div>
                ) : imageUrl ? (
                    <img 
                        src={imageUrl}
                        alt={repo.name} 
                        className='w-full bg-card h-full object-cover overflow-visible rounded-lg'
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
                    </div>
                )}
            </motion.div>
            <motion.div 
                className='w-full flex flex-col items-center justify-center text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <motion.h1 
                    className='text-foreground font-FunnelSans-Medium text-xl text-center mb-2'
                    whileHover={{ color: "#3b82f6" }}
                >
                    {repo.name}
                </motion.h1>
                <motion.p 
                    className='text-muted font-FunnelSans-Light line-clamp-2 text-center text-sm mb-3 max-h-12 overflow-hidden'
                    whileHover={{ color: "#6b7280" }}
                >
                    {repo.description || "Açıklama yok"}
                </motion.p>
                {repo.language && (
                    <motion.span 
                        className='bg-accent text-foreground px-3 py-1 rounded-full text-xs font-GoogleSansCode-Medium'
                        whileHover={{ scale: 1.05 }}
                    >
                        {repo.language}
                    </motion.span>
                )}
            </motion.div>
            <motion.a 
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className='text-accent hover:text-accent-light font-GoogleSansCode-Medium text-sm transition-colors duration-300'
                whileHover={{ scale: 1.05 }}
            >
                GitHub→
            </motion.a>
        </motion.div>
    )
}

export default ProjectCart
