import { KpiStatus } from '@/types/kpi';
import { MachineStatus } from '@/types/machine';
import { AlertSeverity } from '@/types/alert';
import { ProcessStepStatus } from '@/types/process';

export function getKpiStatusColor(status: KpiStatus): string {
  switch (status) {
    case 'normal':
      return '#00E676';
    case 'warning':
      return '#FFAB00';
    case 'critical':
      return '#FF1744';
    case 'offline':
      return '#78909C';
    default:
      return '#78909C';
  }
}

export function getMachineStatusColor(status: MachineStatus): string {
  switch (status) {
    case 'running':
      return '#00E676';
    case 'stopped':
      return '#78909C';
    case 'maintenance':
      return '#FFAB00';
    case 'fault':
      return '#FF1744';
    default:
      return '#78909C';
  }
}

export function getAlertSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical':
      return '#FF1744';
    case 'high':
      return '#FF3D00';
    case 'medium':
      return '#FFAB00';
    case 'low':
      return '#FFD600';
    default:
      return '#78909C';
  }
}

export function getMachineStatusLabel(status: MachineStatus): string {
  switch (status) {
    case 'running':
      return 'Em Operação';
    case 'stopped':
      return 'Parado';
    case 'maintenance':
      return 'Manutenção';
    case 'fault':
      return 'Falha';
    default:
      return 'Desconhecido';
  }
}

export function getAlertSeverityLabel(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical':
      return 'Crítico';
    case 'high':
      return 'Alto';
    case 'medium':
      return 'Médio';
    case 'low':
      return 'Baixo';
    default:
      return 'Desconhecido';
  }
}

export function getProcessStepStatusColor(status: ProcessStepStatus): string {
  switch (status) {
    case 'active':
      return '#00E676';
    case 'idle':
      return '#78909C';
    case 'warning':
      return '#FFAB00';
    case 'fault':
      return '#FF1744';
    default:
      return '#78909C';
  }
}

export function getProcessStepStatusLabel(status: ProcessStepStatus): string {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'idle':
      return 'Ocioso';
    case 'warning':
      return 'Atenção';
    case 'fault':
      return 'Falha';
    default:
      return 'Desconhecido';
  }
}
