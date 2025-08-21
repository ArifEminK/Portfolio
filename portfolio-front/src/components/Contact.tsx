'use client';

import { useState } from 'react';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setLoading(false);
    }
  };
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      className="flex flex-col lg:flex-row w-full h-full overflow-x-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sol Taraf - İletişim Bilgileri */}
      <motion.div
        className="flex-1 flex flex-col justify-center p-4 lg:p-8 bg-secondary/10 order-2 lg:order-1"
        variants={itemVariants}
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground font-FunnelSans-Bold mb-4">
              {t('title')}
            </h2>
            <p className="text-muted font-FunnelSans-Medium leading-relaxed">
              {t('description')}
            </p>
          </motion.div>

          {/* İletişim Bilgileri */}
          <div className="space-y-4">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaEnvelope className="text-accent text-xl" />
              </motion.div>
              <div>
                <p className="text-sm text-muted font-FunnelSans-Regular">{t('email')}</p>
                <a
                  href="mailto:arifeminkoklu@gmail.com"
                  className="text-foreground font-FunnelSans-Medium hover:text-accent transition-colors"
                >
                  arifeminkoklu@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <FaPhone className="text-accent text-xl" />
              </motion.div>
              <div>
                <p className="text-sm text-muted font-FunnelSans-Regular">{t('phone')}</p>
                <a
                  href="tel:+905414602785"
                  className="text-foreground font-FunnelSans-Medium hover:text-accent transition-colors"
                >
                  +90 541 460 27 85
                </a>
              </div>
            </motion.div>
          </div>

          {/* Sosyal Medya İkonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-sm text-muted font-FunnelSans-Regular mb-3">{t('socials')}</p>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/ArifEminK", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/arif-emin-k%C3%B6kl%C3%BC-170332236/", label: "LinkedIn" },
                { icon: FaTwitter, href: "https://twitter.com/ArifEminKkl1", label: "Twitter" },
                { icon: FaInstagram, href: "https://instagram.com/arifeminkoklu", label: "Instagram" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/20 rounded-lg hover:bg-accent/20 transition-colors"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                >
                  <social.icon className="text-2xl text-foreground hover:text-accent transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Sağ Taraf - İletişim Formu */}
      <motion.div
        className="flex-1 flex flex-col justify-center p-4 lg:p-8 order-1 lg:order-2"
        variants={formVariants}
      >
        <div className="max-w-[95vw] sm:max-w-md w-full mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
          <motion.h3
            className="text-2xl font-bold text-foreground font-GoogleSansCode-Bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {t('messageTitle')}
          </motion.h3>

          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            {[
              { id: 'name', label: t('name'), type: 'text', placeholder: t('namePlaceholder') },
              { id: 'email', label: t('email'), type: 'email', placeholder: t('emailPlaceholder') },
              { id: 'subject', label: t('subject'), type: 'text', placeholder: t('subjectPlaceholder') }
            ].map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              >
                <label htmlFor={field.id} className="block text-sm font-medium text-foreground font-GoogleSansCode-Medium mb-2">
                  {field.label}
                </label>
                <motion.input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground font-GoogleSansCode-Regular focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  placeholder={field.placeholder}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-foreground font-GoogleSansCode-Medium mb-2">
                {t('message')}
              </label>
              <motion.textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground font-GoogleSansCode-Regular focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                placeholder={t('messagePlaceholder')}
                required
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
            </motion.div>

            {/* Status Mesajları */}
            {submitStatus.type && (
              <motion.div
                className={`p-3 rounded-lg text-sm font-GoogleSansCode-Medium ${submitStatus.type === 'success'
                    ? 'bg-green-500/20 text-green-600 border border-green-500/30'
                    : 'bg-red-500/20 text-red-600 border border-red-500/30'
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-GoogleSansCode-Medium transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-accent/90 cursor-pointer'
                }`}
              whileHover={!loading ? {
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              {loading ? t('sending') : t('button')}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
