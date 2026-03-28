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
          width: '40%',
          height: '100%',
          background: `radial-gradient(ellipse at top right, ${statusColor}12 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Equipamento Principal
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
              {machine.name}
            </Typography>
          </Box>
          <SpeedIcon sx={{ fontSize: 40, color: statusColor, opacity: 0.6 }} />
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
              backgroundColor: `${statusColor}1A`,
              color: statusColor,
              border: `1px solid ${statusColor}44`,
              fontWeight: 700,
              fontSize: '0.875rem',
              height: 36,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Produção
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: statusColor }}>
              {machine.production?.toLocaleString('pt-BR') ?? '—'} <Typography component="span" variant="caption" color="text.secondary">ton</Typography>
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Operador
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {machine.operator ?? '—'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
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
