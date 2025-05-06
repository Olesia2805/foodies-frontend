import Loader from "components/Loader/Loader";

const HomePage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '70px',
      padding: '50px 0'
    }}>
      <Loader size="large" />
      <Loader size="medium" />
      <Loader size="small" />
      {/* <Loader size="large" fullScreen /> */}
    </div>
  );
};

export default HomePage;
