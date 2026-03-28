export type AlarmPriority = 'critical' | 'high' | 'medium' | 'low';

export type AlarmStatus = 'active' | 'acknowledged' | 'resolved';

export type AlarmCategory =
  | 'safety'
  | 'process'
  | 'equipment'
  | 'quality'
  | 'environmental';

export interface AlarmItem {
  id: string;
  code: string;
  message: string;
  priority: AlarmPriority;
  status: AlarmStatus;
  category: AlarmCategory;
  source: string;
  triggeredAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  acknowledgedBy?: string;
  occurrences: number;
}
