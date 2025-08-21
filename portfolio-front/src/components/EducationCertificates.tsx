'use client';

import { motion } from 'framer-motion';
import { Education } from '@/hooks/useEducation';

interface EducationCertificatesProps {
  items: Education[];
  fullHeight?: boolean;
  maxItems?: number;
}

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
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

export default function EducationCertificates({ items, fullHeight = false, maxItems }: EducationCertificatesProps) {
  return (
    <motion.div 
      className={`flex flex-col w-full ${fullHeight ? 'h-full' : 'min-h-[50vh] lg:h-[50vh] overflow-hidden'} p-3 sm:p-4 md:p-5 lg:p-6`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        {items.slice(0, maxItems || items.length).map((item, index) => (
          <motion.div
            key={index}
            className="relative border-l-2 border-accent pl-6 pb-6 last:pb-0"
            variants={itemVariants}
            whileHover={{ 
              x: 10,
              transition: { duration: 0.2 }
            }}
          >
            {/* Timeline dot */}
            <motion.div 
              className="absolute left-[-8px] top-0 w-4 h-4 bg-accent rounded-full border-2 border-secondary"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            ></motion.div>
            
            {/* Content */}
            <div className="space-y-2">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
                <motion.h3 
                  className="text-base lg:text-lg font-bold text-foreground font-GoogleSansCode-Medium"
                  whileHover={{ color: "#3b82f6" }}
                >
                  {item.title}
                </motion.h3>
                <motion.span 
                  className={`px-2 py-1 text-xs rounded-full font-GoogleSansCode-Medium ${
                    item.type === 'education' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.type === 'education' ? 'Eğitim' : 'Sertifika'}
                </motion.span>
              </div>
              
              <p className="text-muted font-GoogleSansCode-Regular">
                {item.institution}
              </p>
              
              <p className="text-sm text-accent font-GoogleSansCode-Medium">
                {item.period}
              </p>
              
              {item.description && (
                <p className="text-sm text-muted font-GoogleSansCode-Light leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 