import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import css from './RecipePagination.module.css';
import {
  selectSelectedCategory,
  selectSelectedArea,
  selectSelectedIngredients
} from '../../redux/common/index.js';
import {
  selectTotalPages,
  selectPage
} from '../../redux/recipes/selectors';
import {
  fetchRecipes,
  fetchOwnerRecipes
} from '../../redux/recipes/operations';
import { setPage } from '../../redux/recipes/slice';

const RecipePagination = ({ variant = 'all' }) => {
  const selectedArea = useSelector(selectSelectedArea);
  const selectedIngredients = useSelector(selectSelectedIngredients);
  const selectedCategory = useSelector(selectSelectedCategory);
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);

  const dispatch = useDispatch();

  const handlePageClick = selectedPage => {
    const newPage = selectedPage.selected + 1;

    if (variant === 'owner') {
      dispatch(setPage(newPage));
      dispatch(
        fetchOwnerRecipes({
          page: newPage,
        })
      );
    } else {
      dispatch(setPage(newPage));
      dispatch(
        fetchRecipes({
          page: newPage,
          category: selectedCategory?.id,
          area: selectedArea?.value,
          ingredients: selectedIngredients?.map(ing => ing.value),
        })
      );
    }
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        pageCount={totalPages || 1}
        onPageChange={handlePageClick}
        breakLabel={'...'}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName={css.paginationContainer}
        pageClassName={css.paginationItem}
        pageLinkClassName={css.pageLink}
        activeClassName={css.paginationItemActive}
        breakClassName={css.break}
        breakLinkClassName={css.breakLink}
        forcePage={page - 1}
      />
    </div>
  );
};

export default RecipePagination;