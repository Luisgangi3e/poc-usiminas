export type MachineStatus = 'running' | 'stopped' | 'maintenance' | 'fault';

export interface Machine {
  id: string;
  name: string;
  type: string;
  status: MachineStatus;
  lastUpdate: string;
  operator?: string;
  production?: number;
}
