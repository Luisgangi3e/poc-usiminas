'use client';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, active: true },
  { label: 'Máquinas', icon: <PrecisionManufacturingIcon /> },
  { label: 'Relatórios', icon: <AssessmentIcon /> },
  { label: 'Alertas', icon: <NotificationsIcon />, badge: 3 },
  { label: 'Configurações', icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={item.active}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(21, 101, 192, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(21, 101, 192, 0.3)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: item.active ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: item.active ? 600 : 400,
                    color: item.active ? 'text.primary' : 'text.secondary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.disabled">
          v0.1.0-poc
        </Typography>
      </Box>
    </Drawer>
  );
}
