import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm.jsx';
import withAuthGuard from '../../hoc/withAuthGuard.jsx';

const AddRecipePage = () => {
  return (
    <div>
      <span>Home / Add recipe</span>
      <h3>Add recipe Reveal your culinary art, share your favorite</h3>
      <p>recipe and create gastronomic masterpieces with us.</p>
      <AddRecipeForm />
    </div>
  );
};

export default withAuthGuard(AddRecipePage);
