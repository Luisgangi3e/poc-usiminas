export type KpiStatus = 'normal' | 'warning' | 'critical' | 'offline';

export interface KpiData {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: KpiStatus;
  trend?: 'up' | 'down' | 'stable';
  min?: number;
  max?: number;
  target?: number;
}
