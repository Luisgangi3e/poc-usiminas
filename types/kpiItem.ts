export type KpiTrend = 'up' | 'down' | 'stable';

export type KpiHealthStatus =
  | 'excellent'
  | 'good'
  | 'warning'
  | 'critical'
  | 'offline';

export interface KpiItem {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: KpiHealthStatus;
  trend: KpiTrend;
  changePercent: number;
  min: number;
  max: number;
  target: number;
  description?: string;
  lastUpdate: string;
}
