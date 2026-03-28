'use client';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MachineStatusCard from '@/components/dashboard/MachineStatusCard';
import EquipmentVisual from '@/components/dashboard/EquipmentVisual';
import KpiCard from '@/components/dashboard/KpiCard';
import RealTimeLogs from '@/components/dashboard/RealTimeLogs';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import VariablesMonitor from '@/components/dashboard/VariablesMonitor';
import ShiftTimeline from '@/components/dashboard/ShiftTimeline';
import ProcessFlowCard from '@/components/dashboard/ProcessFlowCard';
import MachineStatusTable from '@/components/dashboard/MachineStatusTable';
import { useKpiData } from '@/hooks/useKpiData';
import { useMachineStatus } from '@/hooks/useMachineStatus';
import { useAlerts } from '@/hooks/useAlerts';
import { useProcessFlow } from '@/hooks/useProcessFlow';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
      <Typography
        variant="overline"
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontSize: '0.7rem',
          whiteSpace: 'nowrap',
        }}
      >
        {children}
      </Typography>
      <Divider sx={{ flexGrow: 1, borderColor: 'rgba(255,255,255,0.06)' }} />
    </Box>
  );
}

export default function DashboardPage() {
  const { data: kpis, loading: kpiLoading } = useKpiData();
  const { data: machines, loading: machineLoading } = useMachineStatus();
  const { data: alerts, loading: alertLoading, acknowledgeAlert } = useAlerts();
  const { data: processSteps, loading: processLoading } = useProcessFlow();

  const mainMachine = machines.length > 0 ? machines[0] : undefined;
  const isRunning = mainMachine?.status === 'running';

  return (
    <Box>
      {/* Page Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
          Visão Geral
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Monitoramento em tempo real do Laminador a Frio
        </Typography>
      </Box>

      {/* Dashboard Header Strip: line status, connection, shift, operator, last update */}
      <DashboardHeader />

      {/* Section: Equipment & Status */}
      <SectionLabel>Equipamento Principal</SectionLabel>

      {/* Row 1: Machine Status Card + Equipment Visual */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={5}>
          <MachineStatusCard machine={mainMachine} />
        </Grid>
        <Grid item xs={12} md={7}>
          <EquipmentVisual isRunning={!machineLoading && isRunning} />
        </Grid>
      </Grid>

      {/* Section: KPIs */}
      <SectionLabel>Indicadores de Performance</SectionLabel>

      {/* Row 2: KPI Grid */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
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

      {/* Section: Process */}
      <SectionLabel>Fluxo de Processo</SectionLabel>

      {/* Row 3: Process Flow Card */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12}>
          <ProcessFlowCard steps={processSteps} loading={processLoading} />
        </Grid>
      </Grid>

      {/* Section: Monitoring */}
      <SectionLabel>{'Monitoramento & Alertas'}</SectionLabel>

      {/* Row 4: Real-time Logs + Active Alerts */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
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

      {/* Section: Variables & Shift */}
      <SectionLabel>{'Variáveis de Processo & Turno'}</SectionLabel>

      {/* Row 5: Variables Monitor + Shift Timeline */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={6}>
          <VariablesMonitor />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShiftTimeline />
        </Grid>
      </Grid>

      {/* Section: Machines Overview */}
      <SectionLabel>Visão Geral das Máquinas</SectionLabel>

      {/* Row 6: Machine Status Table */}
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <MachineStatusTable machines={machines} loading={machineLoading} />
        </Grid>
      </Grid>
    </Box>
  );
}
