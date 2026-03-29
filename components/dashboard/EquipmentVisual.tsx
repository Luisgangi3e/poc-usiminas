'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

interface EquipmentVisualProps {
  isRunning?: boolean;
}

export default function EquipmentVisual({ isRunning = true }: EquipmentVisualProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(41, 121, 255, 0.05))',
            }}
          >
            <PrecisionManufacturingIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Laminador a Frio
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Visualização esquemática
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            backgroundColor: 'rgba(6, 11, 24, 0.7)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Base/Floor line */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: '5%',
              width: '90%',
              height: 2,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 1,
            }}
          />

          {/* Desbobinador (left coil) */}
          <Box
            sx={{
              position: 'absolute',
              left: '8%',
              bottom: 30,
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid #448AFF',
              backgroundColor: 'rgba(68, 138, 255, 0.08)',
              boxShadow: isRunning ? '0 0 16px rgba(68, 138, 255, 0.2)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(isRunning && {
                animation: 'coilSpin 3s linear infinite',
                '@keyframes coilSpin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }),
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: '#448AFF',
                opacity: 0.5,
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ position: 'absolute', left: '5%', bottom: 4, color: 'text.secondary', fontSize: '0.65rem' }}
          >
            Desbobinador
          </Typography>

          {/* Steel strip (moving between coils) */}
          <Box
            sx={{
              position: 'absolute',
              left: 'calc(8% + 60px)',
              bottom: 74,
              width: 'calc(84% - 120px)',
              height: 3,
              backgroundColor: '#607D8B',
              borderRadius: 1,
              ...(isRunning && {
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30%',
                  height: '100%',
                  backgroundColor: 'rgba(255,255,255,0.35)',
                  borderRadius: 1,
                  animation: 'stripFlow 1.5s linear infinite',
                  '@keyframes stripFlow': {
                    '0%': { left: '-30%' },
                    '100%': { left: '100%' },
                  },
                },
              }),
            }}
          />

          {/* Rollers (center) */}
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: `calc(30% + ${i * 60}px)`,
                bottom: 38,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {/* Top roller */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2px solid #FF6D00',
                  backgroundColor: 'rgba(255, 109, 0, 0.06)',
                  boxShadow: isRunning ? '0 0 10px rgba(255, 109, 0, 0.15)' : 'none',
                  ...(isRunning && {
                    animation: `rollerSpin ${1.5 + i * 0.3}s linear infinite reverse`,
                    '@keyframes rollerSpin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }),
                }}
              />
              {/* Bottom roller */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2px solid #FF6D00',
                  backgroundColor: 'rgba(255, 109, 0, 0.06)',
                  boxShadow: isRunning ? '0 0 10px rgba(255, 109, 0, 0.15)' : 'none',
                  ...(isRunning && {
                    animation: `rollerSpin2 ${1.5 + i * 0.3}s linear infinite`,
                    '@keyframes rollerSpin2': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }),
                }}
              />
            </Box>
          ))}
          <Typography
            variant="caption"
            sx={{ position: 'absolute', left: '38%', bottom: 4, color: 'text.secondary', fontSize: '0.65rem' }}
          >
            Rolos Laminadores
          </Typography>

          {/* Rebobinador (right coil) */}
          <Box
            sx={{
              position: 'absolute',
              right: '8%',
              bottom: 30,
              width: 50,
              height: 50,
              borderRadius: '50%',
              border: '3px solid #00E676',
              backgroundColor: 'rgba(0, 230, 118, 0.06)',
              boxShadow: isRunning ? '0 0 16px rgba(0, 230, 118, 0.2)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(isRunning && {
                animation: 'coilSpin 2.5s linear infinite reverse',
              }),
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#00E676',
                opacity: 0.5,
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{ position: 'absolute', right: '5%', bottom: 4, color: 'text.secondary', fontSize: '0.65rem' }}
          >
            Rebobinador
          </Typography>

          {/* Direction arrows */}
          {isRunning && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 2,
                  backgroundColor: 'rgba(0, 230, 118, 0.5)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: -6,
                    top: -4,
                    border: '5px solid transparent',
                    borderLeft: '6px solid rgba(0, 230, 118, 0.5)',
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: '#00E676', fontWeight: 700, fontSize: '0.7rem' }}>
                187,4 m/min
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
