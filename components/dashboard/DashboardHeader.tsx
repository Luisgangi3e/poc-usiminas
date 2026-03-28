'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WifiIcon from '@mui/icons-material/Wifi';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import UpdateIcon from '@mui/icons-material/Update';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { formatDate } from '@/utils/formatters';

export default function DashboardHeader() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const update = () => setCurrentTime(formatDate(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        p: 1.5,
        px: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(15, 22, 39, 0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Line Status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CheckCircleIcon sx={{ fontSize: 18, color: '#4CAF50' }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Linha:
        </Typography>
        <Chip
          icon={
            <FiberManualRecordIcon
              sx={{
                fontSize: '10px !important',
                color: '#4CAF50 !important',
                animation: 'headerPulse 2s infinite',
                '@keyframes headerPulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.4 },
                },
              }}
            />
          }
          label="Em Produção"
          size="small"
          sx={{
            backgroundColor: 'rgba(76, 175, 80, 0.12)',
            color: '#4CAF50',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
      </Box>

      <Box sx={{ width: '1px', height: 24, backgroundColor: 'rgba(255,255,255,0.12)' }} />

      {/* Connection */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <WifiIcon sx={{ fontSize: 18, color: '#4CAF50' }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Conexão:
        </Typography>
        <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 600 }}>
          Online
        </Typography>
      </Box>

      <Box sx={{ width: '1px', height: 24, backgroundColor: 'rgba(255,255,255,0.12)' }} />

      {/* Shift */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.light' }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Turno:
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
          A (06:00 - 14:00)
        </Typography>
      </Box>

      <Box sx={{ width: '1px', height: 24, backgroundColor: 'rgba(255,255,255,0.12)' }} />

      {/* Operator */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <PersonIcon sx={{ fontSize: 18, color: 'primary.light' }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Operador:
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
          Carlos Silva
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Last Update */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <UpdateIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
          Atualização:
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary', fontFamily: 'monospace', fontWeight: 600 }}>
          {currentTime}
        </Typography>
      </Box>
    </Box>
  );
}
