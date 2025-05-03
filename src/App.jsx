import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import Layout from './components/Layout/Layout.jsx';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const UserPage = lazy(() => import('pages/UserPage/UserPage'));
const RecipePage = lazy(() => import('pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('pages/AddRecipePage/AddRecipePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/recipe/add" element={<AddRecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
