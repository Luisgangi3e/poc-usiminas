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
      return <PlayArrowIcon {...iconProps} sx={{ ...iconProps.sx, color: '#4CAF50' }} />;
    case 'maintenance':
      return <BuildIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FF9800' }} />;
    case 'alert':
      return <WarningAmberIcon {...iconProps} sx={{ ...iconProps.sx, color: '#F44336' }} />;
    case 'quality':
      return <VerifiedIcon {...iconProps} sx={{ ...iconProps.sx, color: '#42A5F5' }} />;
    case 'shift':
      return <SwapHorizIcon {...iconProps} sx={{ ...iconProps.sx, color: '#AB47BC' }} />;
    default:
      return <PlayArrowIcon {...iconProps} />;
  }
}

function getEventColor(type: ShiftEvent['type']): string {
  switch (type) {
    case 'production':
      return '#4CAF50';
    case 'maintenance':
      return '#FF9800';
    case 'alert':
      return '#F44336';
    case 'quality':
      return '#42A5F5';
    case 'shift':
      return '#AB47BC';
    default:
      return '#90A4AE';
  }
}

export default function ShiftTimeline() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={<TimelineIcon sx={{ color: 'secondary.main' }} />}
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
            background: 'rgba(255,255,255,0.1)',
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
              backgroundColor: 'rgba(255,255,255,0.08)',
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
                    backgroundColor: `${color}1A`,
                    border: `2px solid ${color}`,
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
                    borderRadius: 1,
                    transition: 'background-color 0.2s',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        color,
                        backgroundColor: `${color}1A`,
                        px: 0.75,
                        py: 0.25,
                        borderRadius: 0.5,
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
