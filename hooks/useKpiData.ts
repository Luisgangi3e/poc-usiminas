'use client';

import { useState, useEffect } from 'react';
import { KpiData } from '@/types/kpi';
import { kpiData } from '@/mocks/kpiData';

interface UseKpiDataReturn {
  data: KpiData[];
  loading: boolean;
  error: string | null;
}

export function useKpiData(): UseKpiDataReturn {
  const [data, setData] = useState<KpiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Substituir por conexão SignalR
    // Exemplo de integração futura:
    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl('/hubs/kpi')
    //   .withAutomaticReconnect()
    //   .build();
    // connection.on('KpiUpdate', (updatedData: KpiData[]) => setData(updatedData));
    // connection.start().catch((err) => setError(err.message));

    const timer = setTimeout(() => {
      try {
        setData(kpiData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados de KPI');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}
