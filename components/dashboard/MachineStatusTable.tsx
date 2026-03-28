'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Machine } from '@/types/machine';
import StatusBadge from './StatusBadge';
import { formatTimestamp, formatNumber } from '@/utils/formatters';

interface MachineStatusTableProps {
  machines: Machine[];
  loading?: boolean;
}

export default function MachineStatusTable({ machines, loading = false }: MachineStatusTableProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(41, 121, 255, 0.05))',
            }}
          >
            <PrecisionManufacturingIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          </Box>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Status das Máquinas
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {machines.length} equipamentos monitorados
          </Typography>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Produção</TableCell>
                <TableCell>Operador</TableCell>
                <TableCell>Última Atualização</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <TableCell key={j}>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : machines.map((machine) => (
                    <TableRow
                      key={machine.id}
                      sx={{
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.04)' },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {machine.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {machine.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={machine.status} type="machine" />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" color="text.secondary">
                          {machine.production !== undefined
                            ? `${formatNumber(machine.production, 0)} t`
                            : '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {machine.operator || '—'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {formatTimestamp(machine.lastUpdate)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
