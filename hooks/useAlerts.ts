'use client';

import { useState, useEffect, useCallback } from 'react';
import { Alert } from '@/types/alert';
import { alertsData } from '@/mocks/alerts';

interface UseAlertsReturn {
  data: Alert[];
  loading: boolean;
  error: string | null;
  acknowledgeAlert: (id: string) => void;
}

export function useAlerts(): UseAlertsReturn {
  const [data, setData] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Substituir por conexão SignalR
    // Exemplo de integração futura:
    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl('/hubs/alerts')
    //   .withAutomaticReconnect()
    //   .build();
    // connection.on('NewAlert', (alert: Alert) => setData((prev) => [alert, ...prev]));
    // connection.start().catch((err) => setError(err.message));

    const timer = setTimeout(() => {
      try {
        setData(alertsData);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar alertas');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const acknowledgeAlert = useCallback((id: string) => {
    setData((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  return { data, loading, error, acknowledgeAlert };
}
