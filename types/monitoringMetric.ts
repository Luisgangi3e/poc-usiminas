export type MetricStatus = 'normal' | 'warning' | 'critical' | 'offline';

export type MetricType =
  | 'temperature'
  | 'pressure'
  | 'flow'
  | 'speed'
  | 'vibration'
  | 'current'
  | 'torque'
  | 'humidity';

export interface MonitoringMetric {
  id: string;
  name: string;
  type: MetricType;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold: number;
  criticalThreshold: number;
  status: MetricStatus;
  sensorId: string;
  location: string;
  lastUpdate: string;
}
