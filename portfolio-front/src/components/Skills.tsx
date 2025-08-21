'use client';

import { FaCode, FaTools, FaLaptopCode, FaDatabase, FaLayerGroup } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Skill } from '@/hooks/useSkills';

interface SkillsProps {
  items: Skill[];
  fullHeight?: boolean;
}

// Beceri türlerine göre ikonlar
const getSkillIcon = (type: string) => {
  switch (type) {
    case 'language':
      return <FaCode className="text-blue-500" />;
    case 'program':
      return <FaLaptopCode className="text-green-500" />;
    case 'tool':
      return <FaTools className="text-purple-500" />;
    case 'framework':
      return <FaLayerGroup className="text-orange-500" />;
    case 'database':
      return <FaDatabase className="text-cyan-500" />;
    default:
      return <FaCode className="text-gray-500" />;
  }
};

// Seviye renkleri
const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'advanced':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'expert':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

// Tür etiketleri
const getTypeLabel = (type: string) => {
  switch (type) {
    case 'language':
      return 'Programlama Dili';
    case 'program':
      return 'Program';
    case 'tool':
      return 'Araç';
    case 'framework':
      return 'Framework';
    case 'database':
      return 'Veritabanı';
    default:
      return 'Beceri';
  }
};

// Seviye etiketleri
const getLevelLabel = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'Başlangıç';
    case 'intermediate':
      return 'Orta';
    case 'advanced':
      return 'İleri';
    case 'expert':
      return 'Uzman';
    default:
      return 'Başlangıç';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    }
  }
};

export default function Skills({ items, fullHeight = false }: SkillsProps) {
  return (
    <motion.div 
      className={`flex flex-col w-full ${fullHeight ? 'h-full' : 'min-h-[50vh] lg:h-[50vh] overflow-hidden'} p-3 sm:p-4 md:p-5 lg:p-6`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative border-l-2 border-border pl-6 pb-6 last:pb-0"
            variants={itemVariants}
            whileHover={{ 
              x: 8,
              transition: { duration: 0.2 }
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {getSkillIcon(item.type)}
                </motion.span>
                <motion.h3 
                  className="text-lg font-bold text-foreground font-GoogleSansCode-Medium"
                  whileHover={{ color: "#3b82f6" }}
                >
                  {item.title}
                </motion.h3>
                <div className="flex gap-2 ml-auto">
                  
                  <motion.span 
                    className={`px-2 py-1 text-xs line-clamp-1 rounded-full font-GoogleSansCode-Medium ${
                      item.type === 'language' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : item.type === 'program'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : item.type === 'tool'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : item.type === 'framework'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : item.type === 'database'
                        ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getTypeLabel(item.type)}
                  </motion.span>
                  <motion.span 
                    className={`px-2 py-1 text-xs rounded-full font-GoogleSansCode-Medium ${getLevelColor(item.level)}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {getLevelLabel(item.level)}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 