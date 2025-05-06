import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';
import css from './AddRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <section>
      <div className={css.container}>
        <span>Home / Add recipe</span>
        <h3>Add recipe Reveal your culinary art, share your favorite</h3>
        <p>recipe and create gastronomic masterpieces with us.</p>
        <AddRecipeForm />
      </div>
    </section>
  );
};

export default withAuthGuard(AddRecipePage);
