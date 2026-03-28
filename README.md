# Painel Operacional - Laminador a Frio | Usiminas

Dashboard industrial para monitoramento em tempo real do Laminador a Frio, construído com Next.js, TypeScript e Material UI.

## Stack

- **Next.js 15** com App Router
- **TypeScript 5**
- **Material UI (MUI) v5** com tema dark customizado
- **Emotion** para CSS-in-JS
- **Dados mockados locais** (preparado para futura integração com SignalR e .NET)

## Como rodar

### Pré-requisitos

- **Node.js** 18+ instalado ([https://nodejs.org](https://nodejs.org))
- **npm** 9+ (incluso com Node.js)

### Instalação e execução

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Build de produção

```bash
# Gerar build otimizado
npm run build

# Iniciar servidor de produção
npm run start
```

### Lint

```bash
npm run lint
```

## Estrutura de pastas

```
poc-usiminas/
├── app/
│   ├── layout.tsx               # Layout raiz com ThemeProvider, fontes e CssBaseline
│   ├── page.tsx                 # Página inicial (dashboard com seções)
│   └── globals.css              # Estilos globais e scrollbar customizada
├── components/
│   ├── providers/
│   │   └── ThemeRegistry.tsx    # Client Component para MUI + Next.js App Router SSR
│   ├── layout/
│   │   ├── Header.tsx           # Cabeçalho com título, relógio e status de conexão
│   │   └── Sidebar.tsx          # Menu lateral com navegação e badge de alertas
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx  # Barra de status: linha, conexão, turno, operador
│   │   ├── MachineStatusCard.tsx# Card do equipamento principal com status
│   │   ├── EquipmentVisual.tsx  # Visualização esquemática animada do laminador
│   │   ├── KpiCard.tsx          # Card de KPI com tendência e cores de status
│   │   ├── ProcessFlowCard.tsx  # Fluxo do processo com etapas e métricas
│   │   ├── RealTimeLogs.tsx     # Terminal de logs em tempo real
│   │   ├── AlertsPanel.tsx      # Painel de alertas com reconhecimento
│   │   ├── VariablesMonitor.tsx # Monitoramento de variáveis com barras
│   │   ├── ShiftTimeline.tsx    # Timeline do turno com eventos
│   │   ├── MachineStatusTable.tsx # Tabela com todas as máquinas monitoradas
│   │   └── StatusBadge.tsx      # Badge de status colorido reutilizável
│   └── common/
│       └── LoadingSpinner.tsx   # Spinner de carregamento
├── hooks/
│   ├── useKpiData.ts            # Hook para KPIs (mockado, pronto para SignalR)
│   ├── useMachineStatus.ts      # Hook para máquinas
│   ├── useAlerts.ts             # Hook para alertas com reconhecimento
│   └── useProcessFlow.ts        # Hook para etapas do processo
├── mocks/                       # Dados mockados para desenvolvimento
├── types/                       # Interfaces TypeScript
├── theme/
│   └── theme.ts                 # Tema dark MUI customizado
└── utils/
    ├── formatters.ts            # Funções de formatação (número, data, timestamp)
    └── statusHelpers.ts         # Helpers de status (cor, label) para KPI/máquina/alerta
```

## Próximos passos — Integração com SignalR e API .NET

### 1. Backend .NET com SignalR

Crie uma API ASP.NET Core com hubs SignalR para streaming de dados em tempo real:

```csharp
// Hubs/DashboardHub.cs
public class DashboardHub : Hub
{
    public async Task SendKpiUpdate(KpiData data)
        => await Clients.All.SendAsync("ReceiveKpiUpdate", data);

    public async Task SendMachineStatus(MachineStatus data)
        => await Clients.All.SendAsync("ReceiveMachineStatus", data);

    public async Task SendAlert(Alert alert)
        => await Clients.All.SendAsync("ReceiveAlert", alert);

    public async Task SendLogEvent(LogEvent log)
        => await Clients.All.SendAsync("ReceiveLogEvent", log);
}
```

Registre o hub no `Program.cs`:

```csharp
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
    options.AddPolicy("NextJs", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

app.UseCors("NextJs");
app.MapHub<DashboardHub>("/hubs/dashboard");
```

### 2. Instalar o cliente SignalR no frontend

```bash
npm install @microsoft/signalr
```

### 3. Criar hook de conexão SignalR

```typescript
// hooks/useSignalR.ts
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';

export function useSignalR(hubUrl: string) {
  const connectionRef = useRef<HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.start()
      .then(() => setIsConnected(true))
      .catch(err => console.error('Erro ao conectar SignalR:', err));

    connection.onreconnecting(() => setIsConnected(false));
    connection.onreconnected(() => setIsConnected(true));
    connection.onclose(() => setIsConnected(false));

    connectionRef.current = connection;
    return () => { connection.stop(); };
  }, [hubUrl]);

  return { connection: connectionRef.current, isConnected };
}
```

### 4. Adaptar os hooks existentes

Substituir os dados mockados nos hooks `useKpiData`, `useMachineStatus`, `useAlerts` e `useProcessFlow` por listeners SignalR. Exemplo:

```typescript
// hooks/useKpiData.ts (com SignalR)
import { useSignalR } from './useSignalR';

export function useKpiData() {
  const { connection, isConnected } = useSignalR('/hubs/dashboard');
  const [data, setData] = useState<KpiData[]>([]);

  useEffect(() => {
    if (!connection) return;

    connection.on('ReceiveKpiUpdate', (kpi: KpiData) => {
      setData(prev => prev.map(item =>
        item.id === kpi.id ? kpi : item
      ));
    });

    // Carga inicial via REST
    fetch('/api/kpis').then(res => res.json()).then(setData);
  }, [connection]);

  return { data, loading: !isConnected, error: null };
}
```

### 5. API REST para carga inicial

Além dos hubs SignalR, crie endpoints REST para a carga inicial dos dados:

| Endpoint | Descrição |
|---|---|
| `GET /api/kpis` | KPIs atuais |
| `GET /api/machines` | Status das máquinas |
| `GET /api/alerts` | Alertas ativos |
| `POST /api/alerts/{id}/acknowledge` | Reconhecer alerta |
| `GET /api/process-flow` | Etapas do processo |
| `GET /api/logs` | Logs recentes |
| `GET /api/variables` | Variáveis de processo |
| `GET /api/shift-events` | Eventos do turno |

### 6. Roadmap completo

- [ ] Criar projeto ASP.NET Core com SignalR hub
- [ ] Implementar endpoints REST para carga inicial
- [ ] Instalar `@microsoft/signalr` no frontend
- [ ] Criar hook `useSignalR` reutilizável
- [ ] Adaptar hooks existentes para usar SignalR + REST
- [ ] Configurar variáveis de ambiente (URL da API)
- [ ] Autenticação (Azure AD / JWT)
- [ ] Páginas adicionais: Máquinas, Relatórios, Configurações
- [ ] Histórico e gráficos de tendência (recharts ou visx)
- [ ] Deploy em Azure (backend) + Vercel (frontend)