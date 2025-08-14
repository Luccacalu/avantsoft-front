import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AvanToys',
  description: 'Loja de brinquedos online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <AuthProvider>
        <Header />
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex-grow`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
