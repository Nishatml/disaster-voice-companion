import './globals.css';

export const metadata = {
  title: 'Voice-First Disaster Companion',
  description: 'Emergency alert and disaster management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}