export interface ShiftEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'production' | 'maintenance' | 'alert' | 'quality' | 'shift';
}

export const shiftEventsData: ShiftEvent[] = [
  {
    id: 'evt-001',
    time: '06:00',
    title: 'Início do Turno A',
    description: 'Operador Carlos Silva assumiu o turno',
    type: 'shift',
  },
  {
    id: 'evt-002',
    time: '06:15',
    title: 'Produção Iniciada',
    description: 'Laminador principal em operação - Bobina #4515',
    type: 'production',
  },
  {
    id: 'evt-003',
    time: '07:30',
    title: 'Inspeção de Qualidade',
    description: 'Espessura verificada: 2.34mm - Dentro da tolerância',
    type: 'quality',
  },
  {
    id: 'evt-004',
    time: '08:45',
    title: 'Manutenção Preventiva',
    description: 'Lubrificação dos rolos concluída',
    type: 'maintenance',
  },
  {
    id: 'evt-005',
    time: '09:20',
    title: 'Alerta de Vibração',
    description: 'Desbobinador 2 com vibração acima do normal',
    type: 'alert',
  },
  {
    id: 'evt-006',
    time: '10:00',
    title: 'Troca de Bobina',
    description: 'Bobina #4520 finalizada - Iniciando #4521',
    type: 'production',
  },
  {
    id: 'evt-007',
    time: '11:15',
    title: 'Ajuste de Parâmetros',
    description: 'Velocidade ajustada para 187.4 m/min',
    type: 'production',
  },
];
