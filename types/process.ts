export type ProcessStepStatus = 'active' | 'idle' | 'warning' | 'fault';

export interface ProcessStep {
  id: string;
  name: string;
  status: ProcessStepStatus;
  metric: {
    label: string;
    value: number;
    unit: string;
  };
}
