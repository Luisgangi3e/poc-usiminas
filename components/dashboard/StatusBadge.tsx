'use client';

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { KpiStatus } from '@/types/kpi';
import { MachineStatus } from '@/types/machine';
import { getKpiStatusColor, getMachineStatusColor, getMachineStatusLabel } from '@/utils/statusHelpers';

type StatusType = KpiStatus | MachineStatus;

interface StatusBadgeProps {
  status: StatusType;
  type?: 'kpi' | 'machine';
  label?: string;
}

function isPulsing(status: StatusType): boolean {
  return status === 'running' || status === 'normal';
}

export default function StatusBadge({ status, type = 'machine', label }: StatusBadgeProps) {
  const color =
    type === 'kpi'
      ? getKpiStatusColor(status as KpiStatus)
      : getMachineStatusColor(status as MachineStatus);

  const displayLabel =
    label ||
    (type === 'machine' ? getMachineStatusLabel(status as MachineStatus) : status);

  const pulsing = isPulsing(status);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
      {pulsing && (
        <Box
          component="span"
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'inline-block',
            boxShadow: `0 0 6px ${color}50`,
            animation: 'pulseDot 1.5s ease-in-out infinite',
            '@keyframes pulseDot': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.5, transform: 'scale(1.3)' },
            },
          }}
        />
      )}
      <Chip
        label={displayLabel}
        size="small"
        sx={{
          backgroundColor: `${color}18`,
          color: color,
          border: `1px solid ${color}30`,
          fontWeight: 600,
          fontSize: '0.75rem',
        }}
      />
    </Box>
  );
}
