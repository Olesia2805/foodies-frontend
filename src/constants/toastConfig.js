export const toastConfig = {
  duration: 4000,
  style: {
    background: 'var(--white)',
    color: 'var(--dark-grey)',
    padding: '16px',
    fontFamily: 'var(--font-primary)',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '16px',
  },
  success: {
    iconTheme: {
      primary: 'var(--dark-grey)',
      secondary: 'var(--white)',
    },
  },
  error: {
    style: {
      background: 'var(--white)',
      color: 'var(--error)',
    },
    iconTheme: {
      primary: 'var(--error)',
      secondary: 'var(--white)',
    },
  },
};
