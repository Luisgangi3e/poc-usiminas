import { ProcessStep } from '@/types/process';

export const processFlowData: ProcessStep[] = [
  {
    id: 'alimentacao',
    name: 'Alimentação',
    status: 'active',
    metric: { label: 'Volume', value: 12.4, unit: 't/h' },
  },
  {
    id: 'aquecimento',
    name: 'Aquecimento',
    status: 'active',
    metric: { label: 'Temperatura', value: 680, unit: '°C' },
  },
  {
    id: 'processamento',
    name: 'Processamento',
    status: 'active',
    metric: { label: 'Velocidade', value: 187.4, unit: 'm/min' },
  },
  {
    id: 'corte',
    name: 'Corte',
    status: 'warning',
    metric: { label: 'Ciclos', value: 42, unit: 'cortes/min' },
  },
  {
    id: 'saida',
    name: 'Saída',
    status: 'idle',
    metric: { label: 'Volume', value: 11.8, unit: 't/h' },
  },
];
