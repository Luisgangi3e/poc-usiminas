'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import OutputIcon from '@mui/icons-material/Output';
import { ProcessStep } from '@/types/process';
import { getProcessStepStatusColor, getProcessStepStatusLabel } from '@/utils/statusHelpers';
import { formatNumber } from '@/utils/formatters';

interface ProcessFlowCardProps {
  steps: ProcessStep[];
  loading?: boolean;
}

const stepIcons: Record<string, React.ReactNode> = {
  alimentacao: <LocalShippingIcon sx={{ fontSize: 28 }} />,
  aquecimento: <WhatshotIcon sx={{ fontSize: 28 }} />,
  processamento: <PrecisionManufacturingIcon sx={{ fontSize: 28 }} />,
  corte: <ContentCutIcon sx={{ fontSize: 28 }} />,
  saida: <OutputIcon sx={{ fontSize: 28 }} />,
};

export default function ProcessFlowCard({ steps, loading = false }: ProcessFlowCardProps) {
  if (loading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardHeader
          avatar={<Skeleton variant="circular" width={24} height={24} />}
          title={<Skeleton variant="text" width="50%" />}
          subheader={<Skeleton variant="text" width="30%" />}
        />
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" width={140} height={160} />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={<AccountTreeIcon sx={{ color: 'primary.main' }} />}
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Fluxo do Processo
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Supervisório — etapas do equipamento
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, md: 1.5 },
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
            },
          }}
        >
          {steps.map((step, index) => {
            const color = getProcessStepStatusColor(step.status);
            const label = getProcessStepStatusLabel(step.status);
            const isActive = step.status === 'active';
            const icon = stepIcons[step.id] ?? <AccountTreeIcon sx={{ fontSize: 28 }} />;

            return (
              <Box
                key={step.id}
                sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 }, flexShrink: 0 }}
              >
                {/* Step block */}
                <Box
                  sx={{
                    width: { xs: 120, sm: 140 },
                    borderRadius: 2,
                    border: `1.5px solid ${color}55`,
                    backgroundColor: `${color}0D`,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s, transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 4px 20px ${color}33`,
                    },
                    ...(isActive && {
                      animation: 'processStepPulse 2.5s ease-in-out infinite',
                      '@keyframes processStepPulse': {
                        '0%, 100%': { boxShadow: `0 0 0 0 ${color}00` },
                        '50%': { boxShadow: `0 0 16px 2px ${color}33` },
                      },
                    }),
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ color, display: 'flex' }}>{icon}</Box>

                  {/* Name */}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}
                  >
                    {step.name}
                  </Typography>

                  {/* Status chip */}
                  <Chip
                    label={label}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      backgroundColor: `${color}1A`,
                      color,
                      border: `1px solid ${color}44`,
                    }}
                  />

                  {/* Metric */}
                  <Box sx={{ textAlign: 'center', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                      {step.metric.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color, lineHeight: 1.2 }}
                    >
                      {formatNumber(step.metric.value, step.metric.unit === '°C' ? 0 : 1)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                      {step.metric.unit}
                    </Typography>
                  </Box>
                </Box>

                {/* Arrow connector (not after last step) */}
                {index < steps.length - 1 && (
                  <ArrowForwardIcon
                    sx={{
                      color: 'text.disabled',
                      fontSize: 20,
                      flexShrink: 0,
                      ...(isActive &&
                        steps[index + 1]?.status === 'active' && {
                          color: '#4CAF50',
                          animation: 'arrowBounce 1.5s ease-in-out infinite',
                          '@keyframes arrowBounce': {
                            '0%, 100%': { transform: 'translateX(0)' },
                            '50%': { transform: 'translateX(3px)' },
                          },
                        }),
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
