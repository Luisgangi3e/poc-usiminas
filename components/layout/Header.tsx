'use client';

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FactoryIcon from '@mui/icons-material/Factory';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { formatDate } from '@/utils/formatters';

const SIDEBAR_WIDTH = 240;

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => setCurrentTime(formatDate(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: `${SIDEBAR_WIDTH}px`,
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        backgroundColor: 'rgba(12, 18, 41, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(41, 121, 255, 0.2), rgba(41, 121, 255, 0.05))',
              border: '1px solid rgba(41, 121, 255, 0.25)',
            }}
          >
            <FactoryIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Painel Operacional
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem' }}>
              Laminador a Frio — Usiminas
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mr: 2.5,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            fontSize: '0.8rem',
            fontWeight: 500,
          }}
        >
          {currentTime}
        </Typography>

        <Chip
          icon={
            <FiberManualRecordIcon
              sx={{
                fontSize: '10px !important',
                color: '#00E676 !important',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
            />
          }
          label="Online"
          size="small"
          sx={{
            backgroundColor: 'rgba(0, 230, 118, 0.1)',
            color: '#00E676',
            border: '1px solid rgba(0, 230, 118, 0.25)',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
