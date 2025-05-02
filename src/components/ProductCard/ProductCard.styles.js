export const cardContainerStyles = {
  width: '343px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Mulish, sans-serif',
  boxSizing: 'border-box',
  border: '1px solid #e6e6e6',
  borderRadius: '30px',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    width: '305px',
    height: '275px',
  },
};

export const cardImageStyles = {
  width: '343px',
  height: '230px',
  borderRadius: '30px',
  objectFit: 'cover',
  '@media (max-width: 768px)': {
    width: '305px',
    height: '180px',
  },
};

export const cardDescriptionStyles = {
  fontFamily: 'Mulish',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0 60px 0',
  textAlign: 'left',
  padding: '0 10px',
  '@media (max-width: 768px)': {
    fontSize: '14px',
    lineHeight: '20px',
    margin: '4px 0 50px 0',
  },
};

export const cardActionsStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
};

export const authorContainerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  position: 'absolute',
  bottom: '20px',
  left: '10px',
};

export const authorImageStyles = {
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  objectFit: 'cover',
};

export const authorNameStyles = {
  fontFamily: 'Mulish, sans-serif',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '24px',
  letterSpacing: '-2%',
  margin: 0,
};

export const favoriteButtonStyles = {
  right: '65px',
  width: '40px',
  height: '40px',
  backgroundColor: 'white',
  display: 'flex',
  background: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
  position: 'absolute',
  bottom: '20px',
  borderRadius: '30px',
  outline: 'none',
  boxShadow: 'none',
};

export const arrowButtonStyles = {
  backgroundColor: 'white',
  display: 'flex',
  background: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  width: '36px',
  height: '36px',
  borderRadius: '30px',
  outline: 'none',
  boxShadow: 'none',
};

export const recipeTitleStyles = {
  fontFamily: 'Mulish, sans-serif',
  fontWeight: '800',
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '-2%',
  textTransform: 'uppercase',
  textAlign: 'left',
  padding: '0 10px',
  marginBottom: '0px',
};
