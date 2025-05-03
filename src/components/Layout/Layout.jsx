import { Outlet } from 'react-router-dom';

import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import SignInModal from '../SignInModal/SignInModal.jsx';

const Layout = () => {
  return (
    <>
      <Header />

      <Main>
        <Outlet />
      </Main>

      <Footer />

      <SignUpModal />

      <SignInModal />
    </>
  );
};

export default Layout;
