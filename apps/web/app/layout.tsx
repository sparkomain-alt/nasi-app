import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NASI — Navigate Africa Smarter',
  description: 'African-first navigation platform for drivers, fleets, and communities.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
