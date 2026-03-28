import { KpiStatus } from '@/types/kpi';
import { MachineStatus } from '@/types/machine';
import { AlertSeverity } from '@/types/alert';
import { ProcessStepStatus } from '@/types/process';

export function getKpiStatusColor(status: KpiStatus): string {
  switch (status) {
    case 'normal':
      return '#4CAF50';
    case 'warning':
      return '#FF9800';
    case 'critical':
      return '#F44336';
    case 'offline':
      return '#9E9E9E';
    default:
      return '#9E9E9E';
  }
}

export function getMachineStatusColor(status: MachineStatus): string {
  switch (status) {
    case 'running':
      return '#4CAF50';
    case 'stopped':
      return '#9E9E9E';
    case 'maintenance':
      return '#FF9800';
    case 'fault':
      return '#F44336';
    default:
      return '#9E9E9E';
  }
}

export function getAlertSeverityColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'critical':
      return '#F44336';
    case 'high':
      return '#FF5722';
    case 'medium':
      return '#FF9800';
    case 'low':
      return '#FFC107';
    default:
      return '#9E9E9E';
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
      return '#4CAF50';
    case 'idle':
      return '#9E9E9E';
    case 'warning':
      return '#FF9800';
    case 'fault':
      return '#F44336';
    default:
      return '#9E9E9E';
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
