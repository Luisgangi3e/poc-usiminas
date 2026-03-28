'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { variablesData, ProcessVariable } from '@/mocks/variables';

function getVariableColor(status: ProcessVariable['status']): string {
  switch (status) {
    case 'normal':
      return '#4CAF50';
    case 'warning':
      return '#FF9800';
    case 'critical':
      return '#F44336';
    default:
      return '#90A4AE';
  }
}

export default function VariablesMonitor() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={<MonitorHeartIcon sx={{ color: '#1E88E5' }} />}
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Monitoramento de Variáveis
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Variáveis do processo em tempo real
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {variablesData.map((variable) => {
            const color = getVariableColor(variable.status);
            const percentage = ((variable.value - variable.min) / (variable.max - variable.min)) * 100;

            return (
              <Box key={variable.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    {variable.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color, fontFamily: 'monospace' }}>
                      {variable.value.toLocaleString('pt-BR')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {variable.unit}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" color="text.disabled" sx={{ minWidth: 24, fontSize: '0.65rem' }}>
                    {variable.min}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(percentage, 100)}
                    sx={{
                      flexGrow: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        backgroundColor: color,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.disabled" sx={{ minWidth: 24, fontSize: '0.65rem', textAlign: 'right' }}>
                    {variable.max}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
