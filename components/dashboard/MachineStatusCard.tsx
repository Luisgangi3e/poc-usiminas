'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SpeedIcon from '@mui/icons-material/Speed';
import { Machine } from '@/types/machine';
import { getMachineStatusColor, getMachineStatusLabel } from '@/utils/statusHelpers';
import { formatTimestamp } from '@/utils/formatters';

interface MachineStatusCardProps {
  machine?: Machine;
}

export default function MachineStatusCard({ machine }: MachineStatusCardProps) {
  if (!machine) return null;

  const statusColor = getMachineStatusColor(machine.status);
  const statusLabel = getMachineStatusLabel(machine.status);
  const isRunning = machine.status === 'running';

  return (
    <Card
      sx={{
        height: '100%',
        borderLeft: `4px solid ${statusColor}`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: `radial-gradient(ellipse at top right, ${statusColor}10 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, fontSize: '0.68rem' }}>
              Equipamento Principal
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, letterSpacing: '-0.01em' }}>
              {machine.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${statusColor}18, ${statusColor}08)`,
              border: `1px solid ${statusColor}25`,
            }}
          >
            <SpeedIcon sx={{ fontSize: 28, color: statusColor, opacity: 0.8 }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Chip
            icon={
              <FiberManualRecordIcon
                sx={{
                  fontSize: '12px !important',
                  color: `${statusColor} !important`,
                  ...(isRunning && {
                    animation: 'machineStatusPulse 1.5s infinite',
                    '@keyframes machineStatusPulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.3 },
                    },
                  }),
                }}
              />
            }
            label={statusLabel}
            sx={{
              backgroundColor: `${statusColor}14`,
              color: statusColor,
              border: `1px solid ${statusColor}30`,
              fontWeight: 700,
              fontSize: '0.875rem',
              height: 36,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.68rem' }}>
              Produção
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: statusColor }}>
              {machine.production?.toLocaleString('pt-BR') ?? '—'} <Typography component="span" variant="caption" color="text.secondary">ton</Typography>
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.68rem' }}>
              Operador
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {machine.operator ?? '—'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '0.68rem' }}>
              Última Atualização
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {formatTimestamp(machine.lastUpdate)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
