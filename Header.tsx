// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface HeaderProps {
  user: any;
  toggleLanguage: () => void;
}

export default function Header({ user, toggleLanguage }: HeaderProps) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="bg-slowGreen text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif">MyLittleLaon</Link>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-beige transition-colors">{t('nav.home')}</Link>
          <Link to="/#about" className="hover:text-beige transition-colors">{t('nav.about')}</Link>
          <Link to="/#contact" className="hover:text-beige transition-colors">{t('nav.contact')}</Link>
          <Button variant="ghost" onClick={toggleLanguage}>
            {t('nav.language')}
          </Button>
          <Button onClick={user ? handleLogout : () => window.location.href = '/auth'}>
            {user ? t('nav.logout') : t('nav.login')}
          </Button>
        </nav>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>

      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slowGreen px-4 py-2"
        >
          <Link to="/" className="block py-2 hover:text-beige">{t('nav.home')}</Link>
          <Link to="/#about" className="block py-2 hover:text-beige">{t('nav.about')}</Link>
          <Link to="/#contact" className="block py-2 hover:text-beige">{t('nav.contact')}</Link>
          <Button variant="ghost" onClick={toggleLanguage} className="w-full text-left">
            {t('nav.language')}
          </Button>
          <Button onClick={user ? handleLogout : () => window.location.href = '/auth'} className="w-full">
            {user ? t('nav.logout') : t('nav.login')}
          </Button>
        </motion.nav>
      )}
    </header>
  );
}
