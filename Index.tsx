// src/pages/Index.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';

const Index = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');

  return (
    <div className="min-h-screen flex flex-col bg-beige">
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.metaDesc')} />
        <meta name="keywords" content={t('home.keywords')} />
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.metaDesc')} />
        <meta property="og:image" content="/laon-hero.jpg" />
        <link rel="canonical" href="https://mylittlelaon.fr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "MyLittleLaon",
            "description": t('home.metaDesc'),
            "image": "/laon-hero.jpg",
            "address": { "@type": "PostalAddress", "addressLocality": "Laon", "addressCountry": "FR" },
            "priceRange": "€€",
          })}
        </script>
      </Helmet>

      <Header user={user} toggleLanguage={toggleLanguage} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <h1 className="text-4xl text-slowGreen text-center py-10">Placeholder - Remplace avec Hero</h1>
      </motion.main>

      <footer className="bg-slowGreen text-white py-6 text-center">
        <p>© 2025 MyLittleLaon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
