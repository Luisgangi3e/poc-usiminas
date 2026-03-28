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

const mockMessages: { level: LogEntry['level']; source: string; message: string }[] = [
  { level: 'info', source: 'PLC-01', message: 'Leitura de espessura: 2.34mm' },
  { level: 'info', source: 'PLC-02', message: 'Velocidade atual: 192.1 m/min' },
  { level: 'info', source: 'Sistema', message: 'Sincronização de dados concluída' },
  { level: 'info', source: 'PLC-01', message: 'Tensão da bobina estável em 28.5 kN' },
  { level: 'info', source: 'Sistema', message: 'Backup automático realizado com sucesso' },
  { level: 'success', source: 'Qualidade', message: 'Planicidade aprovada - Desvio 0.8%' },
  { level: 'success', source: 'Rebobinador', message: 'Bobina #4522 enrolada com sucesso' },
  { level: 'success', source: 'Sistema', message: 'Calibração automática finalizada' },
  { level: 'success', source: 'PLC-02', message: 'Ciclo de produção concluído sem falhas' },
  { level: 'warning', source: 'Sensor T-03', message: 'Temperatura do rolo em 335°C - próximo do limite' },
  { level: 'warning', source: 'Hidráulico', message: 'Nível de óleo abaixo de 70%' },
  { level: 'warning', source: 'Motor M-02', message: 'Corrente acima do nominal: 142A' },
  { level: 'warning', source: 'Sistema', message: 'Latência de comunicação elevada: 120ms' },
  { level: 'error', source: 'Sensor P-01', message: 'Falha na leitura do sensor de pressão' },
  { level: 'error', source: 'Desbobinador 2', message: 'Parada de emergência acionada' },
  { level: 'error', source: 'PLC-01', message: 'Timeout na comunicação com CLP auxiliar' },
];

export function generateRandomLog(): LogEntry {
  const entry = mockMessages[Math.floor(Math.random() * mockMessages.length)];
  return {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    level: entry.level,
    source: entry.source,
    message: entry.message,
  };
}
