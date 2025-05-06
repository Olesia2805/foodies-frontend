import { useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Container from '../../components/Container/Container';

const HomePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  return (
    <div>
      <Container>
        {selectedCategoryId ? (
          <div>Recipes</div>
        ) : (
          <Categories onCategorySelect={setSelectedCategoryId} />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
