import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/components/providers/ThemeRegistry';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const metadata: Metadata = {
  title: 'Painel Operacional - Laminador a Frio | Usiminas',
  description: 'Dashboard industrial para monitoramento do Laminador a Frio',
};

const SIDEBAR_WIDTH = 240;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
                minHeight: '100vh',
                backgroundColor: 'background.default',
              }}
            >
              <Toolbar />
              {children}
            </Box>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
