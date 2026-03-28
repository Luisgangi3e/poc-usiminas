# Painel Operacional - Laminador a Frio | Usiminas

Dashboard industrial para monitoramento em tempo real do Laminador a Frio, construído com Next.js, TypeScript e Material UI.

## Stack

- **Next.js 14+** com App Router
- **TypeScript**
- **Material UI (MUI) v5+** com tema dark customizado
- **Dados mockados locais** (preparado para futura integração com SignalR e .NET)

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura de pastas

```
poc-usiminas/
├── app/
│   ├── layout.tsx               # Layout raiz com ThemeProvider e CssBaseline
│   ├── page.tsx                 # Página inicial (dashboard)
│   └── globals.css
├── components/
│   ├── providers/
│   │   └── ThemeRegistry.tsx    # Client Component para MUI + Next.js App Router SSR
│   ├── layout/
│   │   ├── Header.tsx           # Cabeçalho com título e status de conexão
│   │   └── Sidebar.tsx          # Menu lateral com navegação
│   ├── dashboard/
│   │   ├── KpiCard.tsx          # Card de KPI reutilizável
│   │   ├── StatusBadge.tsx      # Badge de status colorido
│   │   ├── MachineStatusTable.tsx # Tabela de status das máquinas
│   │   └── AlertsPanel.tsx      # Painel de alertas ativos
│   └── common/
│       └── LoadingSpinner.tsx   # Spinner de carregamento
├── mocks/
│   ├── kpiData.ts               # Dados mockados dos KPIs
│   ├── machineStatus.ts         # Status mockados das máquinas
│   └── alerts.ts                # Alertas mockados
├── types/
│   ├── kpi.ts
│   ├── machine.ts
│   └── alert.ts
├── hooks/
│   ├── useKpiData.ts            # Hook para KPIs (mockado, pronto para SignalR)
│   ├── useMachineStatus.ts      # Hook para máquinas
│   └── useAlerts.ts             # Hook para alertas
├── theme/
│   └── theme.ts                 # Tema dark MUI customizado
└── utils/
    ├── formatters.ts            # Funções de formatação
    └── statusHelpers.ts         # Helpers de status (cor, label)
```

## Próximos passos

- [ ] Integração com SignalR para dados em tempo real
- [ ] Backend .NET com hubs SignalR
- [ ] Autenticação (Azure AD / JWT)
- [ ] Páginas de Máquinas, Relatórios e Configurações
- [ ] Histórico e gráficos de tendência
- [ ] Deploy em Azure / Vercel