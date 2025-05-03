import { Outlet } from 'react-router-dom';

import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

const Layout = () => {
  return (
    <>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </>
  );
};

export default Layout;
