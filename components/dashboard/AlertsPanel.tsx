'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Alert, AlertSeverity } from '@/types/alert';
import { getAlertSeverityColor, getAlertSeverityLabel } from '@/utils/statusHelpers';
import { formatTimestamp } from '@/utils/formatters';

interface AlertsPanelProps {
  alerts: Alert[];
  loading?: boolean;
  onAcknowledge?: (id: string) => void;
}

function AlertIcon({ severity }: { severity: AlertSeverity }) {
  const color = getAlertSeverityColor(severity);
  const iconProps = { sx: { color, fontSize: 20 } };

  switch (severity) {
    case 'critical':
      return <ErrorIcon {...iconProps} />;
    case 'high':
      return <ErrorIcon {...iconProps} />;
    case 'medium':
      return <WarningIcon {...iconProps} />;
    case 'low':
      return <InfoIcon {...iconProps} />;
    default:
      return <InfoIcon {...iconProps} />;
  }
}

export default function AlertsPanel({ alerts, loading = false, onAcknowledge }: AlertsPanelProps) {
  const activeAlerts = alerts.filter((a) => !a.acknowledged);
  const acknowledgedAlerts = alerts.filter((a) => a.acknowledged);

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
            <NotificationsActiveIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Alertas Ativos
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {loading ? '...' : `${activeAlerts.length} alerta(s) não reconhecido(s)`}
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0, maxHeight: 480, overflow: 'auto' }}>
        {loading ? (
          <List dense>
            {Array.from({ length: 5 }).map((_, i) => (
              <ListItem key={i} alignItems="flex-start">
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <Skeleton variant="circular" width={20} height={20} />
                </ListItemIcon>
                <ListItemText
                  primary={<Skeleton variant="text" width="80%" />}
                  secondary={<Skeleton variant="text" width="50%" />}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <>
            <List dense>
              {activeAlerts.map((alert, index) => {
                const color = getAlertSeverityColor(alert.severity);
                return (
                  <Box key={alert.id}>
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        borderLeft: `3px solid ${color}`,
                        ml: 0.5,
                        pl: 1.5,
                        mb: 0.5,
                        borderRadius: '0 8px 8px 0',
                        backgroundColor: `${color}0A`,
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          backgroundColor: `${color}14`,
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                        <AlertIcon severity={alert.severity} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {alert.message}
                          </Typography>
                        }
                        secondary={
                          <Box
                            component="span"
                            sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, mt: 0.25 }}
                          >
                            <Typography variant="caption" color="text.secondary" component="span">
                              {alert.source} · {formatTimestamp(alert.timestamp)}
                            </Typography>
                            <Typography
                              variant="caption"
                              component="span"
                              sx={{ color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}
                            >
                              {getAlertSeverityLabel(alert.severity)}
                            </Typography>
                          </Box>
                        }
                      />
                      {onAcknowledge && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => onAcknowledge(alert.id)}
                          sx={{
                            mt: 0.5,
                            fontSize: '0.7rem',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'text.secondary',
                            whiteSpace: 'nowrap',
                            borderRadius: '8px',
                            '&:hover': { borderColor: color, color },
                          }}
                        >
                          Reconhecer
                        </Button>
                      )}
                    </ListItem>
                    {index < activeAlerts.length - 1 && (
                      <Divider sx={{ my: 0.5, borderColor: 'rgba(255,255,255,0.03)' }} />
                    )}
                  </Box>
                );
              })}
            </List>

            {acknowledgedAlerts.length > 0 && (
              <>
                <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.06)' }} />
                <Typography variant="caption" sx={{ px: 1, color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
                  Reconhecidos
                </Typography>
                <List dense>
                  {acknowledgedAlerts.map((alert) => (
                    <ListItem key={alert.id} sx={{ opacity: 0.4 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon sx={{ fontSize: 20, color: '#00E676' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
                            {alert.message}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
