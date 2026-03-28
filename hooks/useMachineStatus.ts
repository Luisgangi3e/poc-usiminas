'use client';

import { useState, useEffect } from 'react';
import { Machine } from '@/types/machine';
import { machineStatusData } from '@/mocks/machineStatus';

interface UseMachineStatusReturn {
  data: Machine[];
  loading: boolean;
  error: string | null;
}

export function useMachineStatus(): UseMachineStatusReturn {
  const [data, setData] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Substituir por conexão SignalR
    // Exemplo de integração futura:
    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl('/hubs/machines')
    //   .withAutomaticReconnect()
    //   .build();
    // connection.on('MachineStatusUpdate', (updated: Machine[]) => setData(updated));
    // connection.start().catch((err) => setError(err.message));

    const timer = setTimeout(() => {
      try {
        setData(machineStatusData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar status das máquinas');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}
