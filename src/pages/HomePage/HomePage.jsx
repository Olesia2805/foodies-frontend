import { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Container from '../../components/Container/Container';
import Hero from '../../components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Container>
        <Hero />
        {selectedCategory ? (
          <div>Recipes</div>
        ) : (
          <>
            {/* TODO: перевірити вибір категорії */}
            <Categories onCategorySelect={setSelectedCategory} />
          </>
        )}
        <Testimonials />
      </Container>
    </>
  );
};

export default HomePage;
