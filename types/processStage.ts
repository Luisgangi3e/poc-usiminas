export type StageStatus = 'active' | 'idle' | 'warning' | 'fault' | 'completed';

export interface ProcessStage {
  id: string;
  name: string;
  order: number;
  status: StageStatus;
  progress: number;
  metric: {
    label: string;
    value: number;
    unit: string;
  };
  startedAt?: string;
  estimatedCompletion?: string;
  throughput?: number;
  throughputUnit?: string;
}
