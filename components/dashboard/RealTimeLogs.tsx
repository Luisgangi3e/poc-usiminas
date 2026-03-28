'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TerminalIcon from '@mui/icons-material/Terminal';
import { LogEntry, logsData, generateRandomLog } from '@/mocks/logs';
import { formatTimestamp } from '@/utils/formatters';

const MAX_LOGS = 50;

function getLogColor(level: LogEntry['level']): string {
  switch (level) {
    case 'info':
      return '#40C4FF';
    case 'success':
      return '#00E676';
    case 'warning':
      return '#FFAB00';
    case 'error':
      return '#FF1744';
    default:
      return '#8494A7';
  }
}

function getLogLevelLabel(level: LogEntry['level']): string {
  switch (level) {
    case 'info':
      return 'INFO';
    case 'success':
      return 'OK';
    case 'warning':
      return 'WARN';
    case 'error':
      return 'ERRO';
    default:
      return 'LOG';
  }
}

export default function RealTimeLogs() {
  const [logs, setLogs] = useState<LogEntry[]>(logsData);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateRandomLog();
        const updated = [newLog, ...prev];
        return updated.slice(0, MAX_LOGS);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

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
              background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.15), rgba(0, 230, 118, 0.05))',
            }}
          >
            <TerminalIcon sx={{ color: '#00E676', fontSize: 20 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Logs em Tempo Real
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Últimos eventos do sistema
          </Typography>
        }
      />
      <CardContent
        ref={scrollRef}
        sx={{
          pt: 0,
          maxHeight: 340,
          overflow: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 3,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(6, 11, 24, 0.8)',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.05)',
            p: 1.5,
            fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
          }}
        >
          {logs.map((log) => {
            const color = getLogColor(log.level);
            return (
              <Box
                key={log.id}
                sx={{
                  display: 'flex',
                  gap: 1,
                  py: 0.5,
                  borderBottom: '1px solid rgba(255,255,255,0.025)',
                  '&:last-child': { borderBottom: 'none' },
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', whiteSpace: 'nowrap', minWidth: 60, mt: '1px' }}
                >
                  {formatTimestamp(log.timestamp)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color,
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    minWidth: 38,
                    textAlign: 'center',
                    backgroundColor: `${color}15`,
                    borderRadius: '4px',
                    px: 0.5,
                    mt: '1px',
                  }}
                >
                  {getLogLevelLabel(log.level)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', fontSize: '0.7rem', minWidth: 70, fontWeight: 600, mt: '1px' }}
                >
                  [{log.source}]
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontSize: '0.7rem' }}>
                  {log.message}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
