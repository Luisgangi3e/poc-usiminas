import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2979FF',
      light: '#448AFF',
      dark: '#1565C0',
    },
    secondary: {
      main: '#FF6D00',
      light: '#FF9100',
      dark: '#E65100',
    },
    background: {
      default: '#060B18',
      paper: '#0C1229',
    },
    text: {
      primary: '#E8EDF5',
      secondary: '#8494A7',
    },
    success: {
      main: '#00E676',
      light: '#69F0AE',
      dark: '#00C853',
    },
    warning: {
      main: '#FFAB00',
      light: '#FFD740',
      dark: '#FF8F00',
    },
    error: {
      main: '#FF1744',
      light: '#FF5252',
      dark: '#D50000',
    },
    info: {
      main: '#00B0FF',
      light: '#40C4FF',
      dark: '#0091EA',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.005em',
    },
    subtitle2: {
      fontWeight: 600,
    },
    caption: {
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.32)',
    '0 4px 12px rgba(0,0,0,0.36)',
    '0 6px 16px rgba(0,0,0,0.4)',
    '0 8px 24px rgba(0,0,0,0.44)',
    '0 10px 28px rgba(0,0,0,0.48)',
    '0 12px 32px rgba(0,0,0,0.5)',
    '0 14px 36px rgba(0,0,0,0.52)',
    '0 16px 40px rgba(0,0,0,0.54)',
    '0 18px 44px rgba(0,0,0,0.56)',
    '0 20px 48px rgba(0,0,0,0.58)',
    '0 22px 52px rgba(0,0,0,0.6)',
    '0 24px 56px rgba(0,0,0,0.62)',
    '0 26px 60px rgba(0,0,0,0.64)',
    '0 28px 64px rgba(0,0,0,0.66)',
    '0 30px 68px rgba(0,0,0,0.68)',
    '0 32px 72px rgba(0,0,0,0.7)',
    '0 34px 76px rgba(0,0,0,0.72)',
    '0 36px 80px rgba(0,0,0,0.74)',
    '0 38px 84px rgba(0,0,0,0.76)',
    '0 40px 88px rgba(0,0,0,0.78)',
    '0 42px 92px rgba(0,0,0,0.8)',
    '0 44px 96px rgba(0,0,0,0.82)',
    '0 46px 100px rgba(0,0,0,0.84)',
    '0 48px 104px rgba(0,0,0,0.86)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(ellipse at 20% 0%, rgba(41, 121, 255, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(255, 109, 0, 0.04) 0%, transparent 60%)',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#0C1229', 0.85),
          border: '1px solid rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(41, 121, 255, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#060B18',
          fontWeight: 600,
          color: '#8494A7',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
