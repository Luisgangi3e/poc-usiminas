'use client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MachineStatusCard from '@/components/dashboard/MachineStatusCard';
import EquipmentVisual from '@/components/dashboard/EquipmentVisual';
import KpiCard from '@/components/dashboard/KpiCard';
import RealTimeLogs from '@/components/dashboard/RealTimeLogs';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import VariablesMonitor from '@/components/dashboard/VariablesMonitor';
import ShiftTimeline from '@/components/dashboard/ShiftTimeline';
import { useKpiData } from '@/hooks/useKpiData';
import { useMachineStatus } from '@/hooks/useMachineStatus';
import { useAlerts } from '@/hooks/useAlerts';

export default function DashboardPage() {
  const { data: kpis, loading: kpiLoading } = useKpiData();
  const { data: machines, loading: machineLoading } = useMachineStatus();
  const { data: alerts, loading: alertLoading, acknowledgeAlert } = useAlerts();

  const mainMachine = machines.length > 0 ? machines[0] : undefined;
  const isRunning = mainMachine?.status === 'running';

  return (
    <Box>
      {/* Page Title */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Visão Geral
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitoramento em tempo real do Laminador a Frio
        </Typography>
      </Box>

      {/* Dashboard Header Strip: line status, connection, shift, operator, last update */}
      <DashboardHeader />

      {/* Row 1: Machine Status Card + Equipment Visual */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={5}>
          <MachineStatusCard machine={mainMachine} />
        </Grid>
        <Grid item xs={12} md={7}>
          <EquipmentVisual isRunning={!machineLoading && isRunning} />
        </Grid>
      </Grid>

      {/* Row 2: KPI Grid */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
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

      {/* Row 3: Real-time Logs + Active Alerts */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={7}>
          <RealTimeLogs />
        </Grid>
        <Grid item xs={12} md={5}>
          <AlertsPanel
            alerts={alerts}
            loading={alertLoading}
            onAcknowledge={acknowledgeAlert}
          />
        </Grid>
      </Grid>

      {/* Row 4: Variables Monitor + Shift Timeline */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <VariablesMonitor />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShiftTimeline />
        </Grid>
      </Grid>
    </Box>
  );
}
