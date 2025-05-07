import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout.jsx';
import { ROUTER } from './constants/router.js';
import UIKit from './pages/UIKit/UIkit.jsx';
import { NavLink } from 'react-router-dom';

import { useAuth, useVerification } from './hooks';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));

const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const { isAuthenticated, getUser } = useAuth();
  useVerification();

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, []);

  return (
    <>
      <NavLink to={ROUTER.ADD_RECIPE}>Add recipe</NavLink>
      <NavLink to={'/ui-kit'}>UI kit</NavLink>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path={ROUTER.ADD_RECIPE} element={<AddRecipePage />} />

            <Route path={`${ROUTER.USER}/:id`} element={<UserPage />} />

            <Route path={`${ROUTER.RECIPE}/:id`} element={<RecipePage />} />

            <Route path={'/ui-kit'} element={<UIKit />} />

            <Route path={ROUTER.ALL} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
