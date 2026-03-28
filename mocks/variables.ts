export interface ProcessVariable {
  id: string;
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'warning' | 'critical';
}

export const variablesData: ProcessVariable[] = [
  {
    id: 'var-001',
    name: 'Pressão Hidráulica',
    value: 245,
    unit: 'bar',
    min: 0,
    max: 300,
    status: 'normal',
  },
  {
    id: 'var-002',
    name: 'Temp. Emulsão',
    value: 52,
    unit: '°C',
    min: 0,
    max: 80,
    status: 'normal',
  },
  {
    id: 'var-003',
    name: 'Vazão de Óleo',
    value: 128,
    unit: 'L/min',
    min: 0,
    max: 150,
    status: 'warning',
  },
  {
    id: 'var-004',
    name: 'Torque Motor',
    value: 892,
    unit: 'Nm',
    min: 0,
    max: 1200,
    status: 'normal',
  },
  {
    id: 'var-005',
    name: 'Corrente Principal',
    value: 347,
    unit: 'A',
    min: 0,
    max: 400,
    status: 'warning',
  },
  {
    id: 'var-006',
    name: 'Vibração Mancal',
    value: 3.2,
    unit: 'mm/s',
    min: 0,
    max: 5,
    status: 'critical',
  },
];
