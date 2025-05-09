import { lazy, Suspense, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout/Layout.jsx';
import { ROUTER } from './constants/router.js';
import { toastConfig } from './constants/toastConfig.js';
import { useAuth, useVerification } from './hooks';
import { fetchFavoriteRecipes } from './redux/recipes/index.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RecipePage = lazy(() => import('./pages/RecipePage/RecipePage'));

const UserPage = lazy(() => import('./pages/UserPage/UserPage'));
const AddRecipePage = lazy(() => import('./pages/AddRecipePage/AddRecipePage'));

const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const { isAuthenticated, getUser } = useAuth();
  const dispatch = useDispatch();
  useVerification();

  const initialDataLoadedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !initialDataLoadedRef.current) {
      initialDataLoadedRef.current = true;

      getUser();
      dispatch(fetchFavoriteRecipes());

    } else if (!isAuthenticated) {
      initialDataLoadedRef.current = false;
    }
  }, [isAuthenticated, getUser, dispatch]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={ROUTER.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />

            <Route path={`${ROUTER.USER}/:id`} element={<UserPage />} />

            <Route path={`${ROUTER.RECIPE}/:id`} element={<RecipePage />} />

            <Route path={ROUTER.ADD_RECIPE} element={<AddRecipePage />} />

            <Route path={ROUTER.ALL} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" toastOptions={toastConfig} />
    </>
  );
};

export default App;