import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import Container from '../../components/Container/Container.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  const title = 'Add Recipe';
  return (
    <section>
      <Container>
        <Breadcrumbs items={[{ label: 'Home', link: '/' }, { label: title }]} />
        <div className={css['title-container']}>
          <MainTitle title={title} />
          <Subtitle subtitle="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
        </div>
        <AddRecipeForm />
      </Container>
    </section>
  );
};

export default withAuthGuard(AddRecipePage);
