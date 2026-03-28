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
        backgroundColor: 'background.paper',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <FactoryIcon sx={{ mr: 1.5, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Painel Operacional - Laminador a Frio
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mr: 2 }}>
          {currentTime}
        </Typography>

        <Chip
          icon={
            <FiberManualRecordIcon
              sx={{
                fontSize: '10px !important',
                color: '#4CAF50 !important',
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
            backgroundColor: 'rgba(76, 175, 80, 0.12)',
            color: '#4CAF50',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            fontWeight: 600,
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
