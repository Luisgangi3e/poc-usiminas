export type MachineOperationalState =
  | 'running'
  | 'stopped'
  | 'maintenance'
  | 'fault'
  | 'standby';

export interface MachineStatus {
  id: string;
  name: string;
  type: string;
  operationalState: MachineOperationalState;
  healthScore: number;
  lastUpdate: string;
  operator?: string;
  currentSpeed?: number;
  nominalSpeed?: number;
  speedUnit?: string;
  temperature?: number;
  temperatureUnit?: string;
  uptime: number;
  totalProduction: number;
  productionUnit: string;
  alerts: number;
  location: string;
}
