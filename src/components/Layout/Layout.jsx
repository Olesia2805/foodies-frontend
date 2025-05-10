import { Outlet } from 'react-router-dom';

import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import ModalContainer from '../ModalContainer/ModalContainer.jsx';

const Layout = () => {
  return (
    <>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />

      <ModalContainer />
    </>
  );
};

export default Layout;
