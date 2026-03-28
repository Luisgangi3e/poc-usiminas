'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TimelineIcon from '@mui/icons-material/Timeline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VerifiedIcon from '@mui/icons-material/Verified';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ShiftEvent, shiftEventsData } from '@/mocks/shiftEvents';

function getEventIcon(type: ShiftEvent['type']) {
  const iconProps = { sx: { fontSize: 18 } };
  switch (type) {
    case 'production':
      return <PlayArrowIcon {...iconProps} sx={{ ...iconProps.sx, color: '#00E676' }} />;
    case 'maintenance':
      return <BuildIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FFAB00' }} />;
    case 'alert':
      return <WarningAmberIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FF1744' }} />;
    case 'quality':
      return <VerifiedIcon {...iconProps} sx={{ ...iconProps.sx, color: '#40C4FF' }} />;
    case 'shift':
      return <SwapHorizIcon {...iconProps} sx={{ ...iconProps.sx, color: '#CE93D8' }} />;
    default:
      return <PlayArrowIcon {...iconProps} />;
  }
}

function getEventColor(type: ShiftEvent['type']): string {
  switch (type) {
    case 'production':
      return '#00E676';
    case 'maintenance':
      return '#FFAB00';
    case 'alert':
      return '#FF1744';
    case 'quality':
      return '#40C4FF';
    case 'shift':
      return '#CE93D8';
    default:
      return '#8494A7';
  }
}

export default function ShiftTimeline() {
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
              background: 'linear-gradient(135deg, rgba(255, 109, 0, 0.15), rgba(255, 109, 0, 0.05))',
            }}
          >
            <TimelineIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Timeline do Turno
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Eventos do turno atual
          </Typography>
        }
      />
      <CardContent
        sx={{
          pt: 0,
          maxHeight: 400,
          overflow: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
          },
        }}
      >
        <Box sx={{ position: 'relative', pl: 3 }}>
          {/* Vertical timeline line */}
          <Box
            sx={{
              position: 'absolute',
              left: 10,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: 'rgba(255,255,255,0.06)',
              borderRadius: 1,
            }}
          />

          {shiftEventsData.map((event, index) => {
            const color = getEventColor(event.type);
            const isLast = index === shiftEventsData.length - 1;

            return (
              <Box
                key={event.id}
                sx={{
                  position: 'relative',
                  pb: isLast ? 0 : 2.5,
                  '&:hover': {
                    '& .timeline-content': {
                      backgroundColor: 'rgba(255,255,255,0.03)',
                    },
                  },
                }}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: -23,
                    top: 4,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: `${color}14`,
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 8px ${color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  {getEventIcon(event.type)}
                </Box>

                {/* Content */}
                <Box
                  className="timeline-content"
                  sx={{
                    ml: 1,
                    p: 1.5,
                    borderRadius: '10px',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontWeight: 700,
                        color,
                        backgroundColor: `${color}14`,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                      }}
                    >
                      {event.time}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {event.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {event.description}
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
