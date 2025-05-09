import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';
import MainTitle from '../../components/MainTitle/MainTitle.jsx';
import Subtitle from '../../components/Subtitle/Subtitle.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <section>
      <div className={css.container}>
        <div className={css['title-container']}>
          <MainTitle title="Add recipe" />
          <Subtitle subtitle="Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us." />
        </div>
        <AddRecipeForm />
      </div>
    </section>
  );
};

// export default AddRecipePage;
export default withAuthGuard(AddRecipePage);
