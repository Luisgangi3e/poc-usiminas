export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  source: string;
  message: string;
}

export const logsData: LogEntry[] = [
  {
    id: 'log-001',
    timestamp: new Date(Date.now() - 10 * 1000).toISOString(),
    level: 'info',
    source: 'PLC-01',
    message: 'Ciclo de laminação iniciado - Bobina #4521',
  },
  {
    id: 'log-002',
    timestamp: new Date(Date.now() - 45 * 1000).toISOString(),
    level: 'success',
    source: 'Rebobinador',
    message: 'Bobina #4520 finalizada com sucesso',
  },
  {
    id: 'log-003',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    level: 'warning',
    source: 'Sensor T-03',
    message: 'Temperatura do rolo superior acima de 340°C',
  },
  {
    id: 'log-004',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    level: 'info',
    source: 'Sistema',
    message: 'Ajuste automático de velocidade aplicado: 187.4 m/min',
  },
  {
    id: 'log-005',
    timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    level: 'error',
    source: 'Desbobinador 2',
    message: 'Vibração excessiva detectada - Nível 3.2g',
  },
  {
    id: 'log-006',
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    level: 'info',
    source: 'PLC-02',
    message: 'Troca de bobina concluída no Desbobinador 1',
  },
  {
    id: 'log-007',
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    level: 'success',
    source: 'Qualidade',
    message: 'Espessura dentro da tolerância: 2.35mm ±0.02',
  },
  {
    id: 'log-008',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    level: 'warning',
    source: 'Hidráulico',
    message: 'Pressão do sistema em 85% da capacidade nominal',
  },
];
