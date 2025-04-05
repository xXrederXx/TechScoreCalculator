import { StyleSheet, TextStyle } from 'react-native';

export const theme = {
  colors: {
    text: {
      verydark: '#5c6070',
      dark: '#9da1ae',
      normal: '#e3e4e8',
      light: '#fff',
      verylight: '#fff',
      muted: '#adb5bd',
      disabled: '#7a7f8a',
    },
    background: {
      verydark: '#000',
      dark: '#000',
      normal: '#101219',
      light: '#424a67',
      verylight: '#7d87ab',
      overlay: 'rgba(0, 0, 0, 0.6)',
      disabled: '#1f1f1f',
    },
    primary: {
      verydark: '#384977',
      dark: '#6178b4',
      normal: '#a6b3d5',
      light: '#ebeef6',
      verylight: '#fff',
    },
    secondary: {
      verydark: '#000',
      dark: '#121b33',
      normal: '#2c427f',
      light: '#4f6dc2',
      verylight: '#9bacdc',
    },
    accent: {
      verydark: '#112048',
      dark: '#25449b',
      normal: '#5174d5',
      light: '#a3b6e9',
      verylight: '#f5f7fd',
    },
    success: {
      dark: '#1b5e20',
      normal: '#4caf50',
      light: '#c8e6c9',
    },
    error: {
      dark: '#b71c1c',
      normal: '#f44336',
      light: '#ffcdd2',
    },
    warning: {
      dark: '#ff6f00',
      normal: '#ff9800',
      light: '#ffe0b2',
    },
    info: {
      dark: '#01579b',
      normal: '#03a9f4',
      light: '#b3e5fc',
    },
    transparent: 'transparent',
    white: '#fff',
    black: '#000',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  fontWeights: {
    regular: '400' as '400',
    medium: '500' as '500',
    bold: '700'as '700',
    heavy: '900'as '900',
  },

  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
  },

  zIndex: {
    background: 0,
    base: 1,
    dropdown: 10,
    overlay: 20,
    modal: 30,
    toast: 40,
    tooltip: 50,
  },

  breakpoints: {
    sm: 320,
    md: 375,
    lg: 414,
    xl: 768,
    xxl: 1024,
  },
};

export const PreFlex = StyleSheet.create({
  AllCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
export const PreStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.normal,
  },

  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.sm,
  } as TextStyle,

  subtitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text.normal,
    marginBottom: theme.spacing.xs,
  },

  text: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.normal,
  },

  mutedText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text.muted,
  },

  button: {
    backgroundColor: theme.colors.primary.normal,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },

  buttonText: {
    color: theme.colors.text.light,
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.medium,
  },

  card: {
    backgroundColor: theme.colors.background.light,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary.light,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    color: theme.colors.text.normal,
    backgroundColor: theme.colors.background.verylight,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent.normal,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
  },

  badgeText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.text.light,
  },
});

