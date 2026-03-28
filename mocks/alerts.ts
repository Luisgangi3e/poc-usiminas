import { Alert } from '@/types/alert';

export const alertsData: Alert[] = [
  {
    id: 'alert-001',
    message: 'Vibração excessiva detectada no Desbobinador 2',
    severity: 'critical',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    source: 'Desbobinador 2',
    acknowledged: false,
  },
  {
    id: 'alert-002',
    message: 'Temperatura fora do limite no Forno de Recozimento',
    severity: 'high',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    source: 'Forno de Recozimento',
    acknowledged: false,
  },
  {
    id: 'alert-003',
    message: 'Falha de comunicação com PLC-03',
    severity: 'high',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'PLC-03',
    acknowledged: false,
  },
  {
    id: 'alert-004',
    message: 'Manutenção programada para o Laminador Principal em 48h',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: 'Laminador Principal',
    acknowledged: true,
  },
  {
    id: 'alert-005',
    message: 'Pressão hidráulica abaixo do nível recomendado',
    severity: 'low',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: 'Sistema Hidráulico',
    acknowledged: false,
  },
];
