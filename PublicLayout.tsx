// src/layouts/PublicLayout.tsx
import { ReactNode } from 'react';
import Header from '@/components/Header';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-beige">
      <Header user={null} toggleLanguage={() => {}} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
