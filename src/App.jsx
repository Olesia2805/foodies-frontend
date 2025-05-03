import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const UserPage = lazy(() => import('pages/UserPage/UserPage'));
const RecipePage = lazy(() => import('pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('pages/AddRecipePage/AddRecipePage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));
import SharedLayoutExample from 'components/SharedLayoutExample/SharedLayoutExample';
import Loader from 'components/Loader/Loader';

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<SharedLayoutExample />}>
            <Route index element={<HomePage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/recipe/add" element={<AddRecipePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
