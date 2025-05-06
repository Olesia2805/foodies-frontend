import { useState } from 'react';

import Categories from '../../components/Categories/Categories';
import Container from '../../components/Container/Container';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <Container>
        {selectedCategory ? (
          <div>Recipes</div>
        ) : (
          <Categories onCategorySelect={setSelectedCategory} />
        )}
      </Container>
    </div>
  );
};

export default HomePage;
