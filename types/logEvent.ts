export type LogLevel = 'info' | 'warning' | 'error' | 'success' | 'debug';

export type LogCategory =
  | 'system'
  | 'production'
  | 'safety'
  | 'maintenance'
  | 'quality';

export interface LogEvent {
  id: string;
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  source: string;
  message: string;
  operator?: string;
  machineId?: string;
  details?: string;
}
