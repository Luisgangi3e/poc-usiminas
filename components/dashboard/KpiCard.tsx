'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { KpiData } from '@/types/kpi';
import { getKpiStatusColor } from '@/utils/statusHelpers';
import { formatNumber } from '@/utils/formatters';

interface KpiCardProps {
  data?: KpiData;
  loading?: boolean;
}

function TrendIcon({ trend }: { trend?: 'up' | 'down' | 'stable' }) {
  if (!trend) return null;
  if (trend === 'up') return <TrendingUpIcon sx={{ fontSize: 20, color: '#4CAF50' }} />;
  if (trend === 'down') return <TrendingDownIcon sx={{ fontSize: 20, color: '#F44336' }} />;
  return <TrendingFlatIcon sx={{ fontSize: 20, color: '#90A4AE' }} />;
}

export default function KpiCard({ data, loading = false }: KpiCardProps) {
  if (loading || !data) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="80%" height={48} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    );
  }

  const statusColor = getKpiStatusColor(data.status);

  return (
    <Card
      sx={{
        borderTop: `3px solid ${statusColor}`,
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
        >
          {data.label}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, gap: 1 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 700, color: statusColor, lineHeight: 1 }}
          >
            {formatNumber(data.value, data.unit === 'mm' ? 2 : 1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.unit}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}>
          <TrendIcon trend={data.trend} />
          {data.target && (
            <Typography variant="caption" color="text.disabled">
              Meta: {data.target} {data.unit}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
