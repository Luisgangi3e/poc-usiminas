export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  source: string;
  acknowledged: boolean;
}
