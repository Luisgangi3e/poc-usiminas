'use client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KpiCard from '@/components/dashboard/KpiCard';
import MachineStatusTable from '@/components/dashboard/MachineStatusTable';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import { useKpiData } from '@/hooks/useKpiData';
import { useMachineStatus } from '@/hooks/useMachineStatus';
import { useAlerts } from '@/hooks/useAlerts';

export default function DashboardPage() {
  const { data: kpis, loading: kpiLoading } = useKpiData();
  const { data: machines, loading: machineLoading } = useMachineStatus();
  const { data: alerts, loading: alertLoading, acknowledgeAlert } = useAlerts();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Visão Geral
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitoramento em tempo real do Laminador a Frio
        </Typography>
      </Box>

      {/* KPI Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {kpiLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <KpiCard loading />
              </Grid>
            ))
          : kpis.map((kpi) => (
              <Grid item xs={12} sm={6} md={3} key={kpi.id}>
                <KpiCard data={kpi} />
              </Grid>
            ))}
      </Grid>

      {/* Second Row: Machine Table + Alerts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <MachineStatusTable machines={machines} loading={machineLoading} />
        </Grid>
        <Grid item xs={12} md={5}>
          <AlertsPanel
            alerts={alerts}
            loading={alertLoading}
            onAcknowledge={acknowledgeAlert}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
