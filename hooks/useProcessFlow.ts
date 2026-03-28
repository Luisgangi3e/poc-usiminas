'use client';

import { useState, useEffect } from 'react';
import { ProcessStep } from '@/types/process';
import { processFlowData } from '@/mocks/processFlow';

interface UseProcessFlowReturn {
  data: ProcessStep[];
  loading: boolean;
  error: string | null;
}

export function useProcessFlow(): UseProcessFlowReturn {
  const [data, setData] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Substituir por conexão SignalR
    const timer = setTimeout(() => {
      try {
        setData(processFlowData);
        setLoading(false);
      } catch {
        setError('Erro ao carregar dados do fluxo de processo');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}
