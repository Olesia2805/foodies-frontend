import React from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/Button/Button';

const HomePage = () => {
  const showSuccessToast = () => {
    toast.success('Success! Your action was completed successfully.');
  };

  const showErrorToast = () => {
    toast.error('Error! Something went wrong. Please try again.');
  };

  const showLoadingToast = () => {
    toast.loading('Loading... Please wait.');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '50px 0',
      }}
    >
      <h2>Toast Notification Tests</h2>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button variant="primary" onClick={showSuccessToast}>
          Show Success Toast
        </Button>

        <Button variant="secondary" onClick={showErrorToast}>
          Show Error Toast
        </Button>

        <Button variant="outlined" onClick={showLoadingToast}>
          Show Loading Toast
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
