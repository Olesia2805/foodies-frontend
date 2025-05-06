export const toastConfig = {
  duration: 4000,
  style: {
    background: 'var(--white)',
    color: 'var(--dark-grey)',
    border: '1px solid var(--border)',
    padding: '16px',
    fontFamily: 'var(--font-primary)',
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
      color: '#E53935',
      border: '1px solid #FFCDD2',
    },
    iconTheme: {
      primary: '#E53935',
      secondary: 'var(--white)',
    },
  },
};
