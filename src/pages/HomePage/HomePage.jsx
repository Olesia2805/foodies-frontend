import { useState } from 'react';
import Categories from '../../components/Categories/Categories';
import Container from '../../components/Container/Container';
import Hero from 'components/Hero/Hero';
import Testimonials from '../../components/Testimonials/Testimonials';

const HomePage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  return (
    <>
      <Container>
        <Hero />
        {selectedCategoryId ? (
          <div>Recipes</div>
        ) : (
          <Categories onCategorySelect={setSelectedCategoryId} />
        )}
        <Testimonials />
      </Container>
    </>
  );
};

export default HomePage;
