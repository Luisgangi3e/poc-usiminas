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
      return '#42A5F5';
    case 'success':
      return '#4CAF50';
    case 'warning':
      return '#FF9800';
    case 'error':
      return '#F44336';
    default:
      return '#90A4AE';
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
        avatar={<TerminalIcon sx={{ color: '#4CAF50' }} />}
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
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 3,
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(10, 14, 26, 0.8)',
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.06)',
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
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  '&:last-child': { borderBottom: 'none' },
                  alignItems: 'flex-start',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'text.disabled', fontSize: '0.7rem', whiteSpace: 'nowrap', minWidth: 60, mt: '1px' }}
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
                    backgroundColor: `${color}1A`,
                    borderRadius: 0.5,
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
