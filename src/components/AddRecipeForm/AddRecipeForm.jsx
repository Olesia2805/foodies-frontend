import { useEffect, useMemo, useState } from 'react';
import PhotoUploader from '../formComponents/PhotoUploader/PhotoUploader';
import css from './AddRecipeForm.module.css';
import { Controller, useForm } from 'react-hook-form';
import InputTitle from '../formComponents/InputTitle/InputTitle';
import InputTextCounter from '../formComponents/InputTextCounter/InputTextCounter';
import InputTimeCounter from '../formComponents/InputTimeCounter/InputTimeCounter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Fieldset from '../formComponents/Fieldset/Fieldset';
import FormTitle from '../formComponents/FormTitle/FormTitle';
import InputIngredients from '../formComponents/InputIngredients/InputIngredients';
import DropdownSearch from '../formComponents/DropdownSearch/DropdownSearch';
import {
  selectCategories,
  selectCategoriesError,
  selectCategoriesIsLoading,
} from '../../redux/categories/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/categories/operations';
import {
  selectAreas,
  selectAreasError,
  selectAreasIsLoading,
} from '../../redux/areas/selectors';
import { fetchAreas } from '../../redux/areas/operations';
import { yupResolver } from '@hookform/resolvers/yup';
import { recipeSchema } from './recipeSchema';
import ErrorWrapper from '../formComponents/ErrorWrapper/ErrorWrapper';
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_INSTRUCTIONS_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MIN_INSTRUCTIONS_LENGTH,
  MIN_TITLE_LENGTH,
} from '../../constants/recipeForm';
import recipeAPI from '../../api/recipeAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import Loader from '../Loader/Loader';

const defaultValue = {
  photo: '',
  title: '',
  description: '',
  category: '',
  time: 0,
  area: '',
  ingredients: [],
  preparation: '',
};

export default function AddRecipeForm() {
  const isCategoriesLoading = useSelector(selectCategoriesIsLoading);
  const categoriesError = useSelector(selectCategoriesError);
  const allCategories = useSelector(selectCategories);

  const isAreasLoading = useSelector(selectAreasIsLoading);
  const areasError = useSelector(selectAreasError);
  const allAreas = useSelector(selectAreas);

  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesError) {
      return toast.error(categoriesError + '\nPlease Reload the page');
    }
    if (allCategories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categoriesError, allCategories.length, dispatch]);

  useEffect(() => {
    if (areasError) {
      return toast.error(areasError + '\nPlease Reload the page');
    }
    if (allAreas.length === 0) {
      dispatch(fetchAreas());
    }
  }, [areasError, allAreas.length, dispatch]);

  const [isPostingRecipe, setIsPostingRecipe] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultValue,
    resolver: yupResolver(recipeSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const preparedData = {
      thumb: data.photo,
      title: data.title,
      description: data.description,
      // TODO: Choose how we send fields to the Backend: as Number(id) or String(name) ?
      // area: Number(data.area.value),
      // category: Number(data.category.value),
      category: String(data.category.label),
      area: String(data.area.label),
      instructions: data.preparation,
      time: Number(data.time),
      ingredients: data.ingredients.map(({ id, quantity }) => {
        return { ingredientId: Number(id), quantity: quantity };
      }),
    };

    const formData = new FormData();

    for (let key in preparedData) {
      const value = preparedData[key];

      if (typeof value === 'object' && !(value instanceof File)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
    try {
      setIsPostingRecipe(true);
      const response = await recipeAPI.createRecipe(formData);
      if (response.status !== 201) throw new Error(response);
      const recipeId = response.data.recipe._id;
      navigate(`${ROUTER.RECIPE}/${recipeId}`);
    } catch (error) {
      // TODO: Review how to show errors from backend
      toast.error(
        error?.response?.data?.message ||
          'An unexpected error occurred while posting the recipe. \nPlease try submitting again or refresh the page.'
      );
    } finally {
      setIsPostingRecipe(false);
    }
  };

  const createSelectOptions = function (item) {
    return {
      value: item._id,
      label: item.name,
    };
  };

  const areaOptions = useMemo(
    () => allAreas.map(createSelectOptions),
    [allAreas]
  );

  const categoryOptions = useMemo(
    () => allCategories.map(createSelectOptions),
    [allCategories]
  );

  const resetForm = () => {
    reset(defaultValue);
    setResetTrigger((prev) => !prev);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css['column-1']}>
        <Controller
          control={control}
          name="photo"
          rules={{
            required: true,
          }}
          render={({
            field: { onChange, value, name },
            fieldState: { error },
          }) => (
            <ErrorWrapper errorMessage={error?.message} isShadow={false}>
              <PhotoUploader
                onChange={onChange}
                error={error}
                value={value}
                name={name}
              />
            </ErrorWrapper>
          )}
        />
      </div>

      <div className={css['column-2']}>
        <Fieldset className={css['inputs-main-wrapper']}>
          <ErrorWrapper errorMessage={errors?.title?.message}>
            <InputTitle
              {...register('title', {
                required: true,
                maxLength: MAX_TITLE_LENGTH,
                minLength: MIN_TITLE_LENGTH,
              })}
            />
          </ErrorWrapper>

          <Controller
            control={control}
            name="description"
            rules={{
              required: true,
              maxLength: MAX_DESCRIPTION_LENGTH,
              minLength: MIN_DESCRIPTION_LENGTH,
            }}
            render={({
              field: { onChange, value, name, ref, onBlur },
              fieldState: { invalid, isTouched, error, isDirty },
            }) => (
              <ErrorWrapper errorMessage={error?.message}>
                <InputTextCounter
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error}
                  invalid={invalid}
                  maxInputLenght={MAX_DESCRIPTION_LENGTH}
                  placeholder="Enter a description of the dish"
                  isTouched={isTouched}
                  isDirty={isDirty}
                  onBlur={onBlur}
                  ref={ref}
                />
              </ErrorWrapper>
            )}
          />
        </Fieldset>

        <div className={css['media-wrapper-row']}>
          <Fieldset>
            <FormTitle>Category</FormTitle>
            <Controller
              control={control}
              name="category"
              render={({
                field: { value, name, onChange },
                fieldState: { error },
              }) => (
                <div className={css.dropdown}>
                  <ErrorWrapper errorMessage={error?.message} isShadow={false}>
                    <DropdownSearch
                      onChange={(newValue) => onChange(newValue)}
                      value={value}
                      options={categoryOptions}
                      placeholder="Select a category"
                      isDisabled={categoriesError && isCategoriesLoading}
                      error={error}
                      name={name}
                    />
                  </ErrorWrapper>
                </div>
              )}
            />
          </Fieldset>

          <Fieldset>
            <FormTitle>Cooking time</FormTitle>
            <Controller
              control={control}
              name="time"
              render={({
                field: { onChange, value, name },
                fieldState: { error },
              }) => (
                <ErrorWrapper errorMessage={error?.message}>
                  <InputTimeCounter
                    onChange={onChange}
                    value={value}
                    error={error}
                  />
                </ErrorWrapper>
              )}
            />
          </Fieldset>
        </div>

        <div className={css['media-wrapper-row']}>
          <Fieldset>
            <FormTitle>Area</FormTitle>
            <Controller
              control={control}
              name="area"
              render={({
                field: { value, name, onChange },
                fieldState: { error },
              }) => (
                <div className={css.dropdown}>
                  <ErrorWrapper errorMessage={error?.message} isShadow={false}>
                    <DropdownSearch
                      onChange={(newValue) => onChange(newValue)}
                      value={value}
                      options={areaOptions}
                      placeholder="Select an area"
                      isDisabled={areasError && isAreasLoading}
                      error={error}
                      name={name}
                    />
                  </ErrorWrapper>
                </div>
              )}
            />
          </Fieldset>
        </div>

        <Controller
          control={control}
          name="ingredients"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <ErrorWrapper errorMessage={errors?.ingredients?.message}>
              <InputIngredients
                onChange={onChange}
                error={error}
                value={value}
                resetTrigger={resetTrigger}
              />
            </ErrorWrapper>
          )}
        />

        <Fieldset>
          <FormTitle>Recipe Preparation</FormTitle>
          <Controller
            control={control}
            name="preparation"
            rules={{
              required: true,
              maxLength: MAX_INSTRUCTIONS_LENGTH,
              minLength: MIN_INSTRUCTIONS_LENGTH,
            }}
            render={({
              field: { onChange, value, name, ref, onBlur },
              fieldState: { invalid, isTouched, error, isDirty },
            }) => (
              <ErrorWrapper errorMessage={error?.message}>
                <InputTextCounter
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error}
                  invalid={invalid}
                  maxInputLenght={MAX_INSTRUCTIONS_LENGTH}
                  placeholder="Enter recipe"
                  isTouched={isTouched}
                  isDirty={isDirty}
                  className={css['margin-preparation']}
                  onBlur={onBlur}
                  ref={ref}
                />
              </ErrorWrapper>
            )}
          />
        </Fieldset>

        <div className={css['btn-container']}>
          <button
            className={css['btn-delete']}
            type="button"
            onClick={resetForm}
            aria-label="Reset form"
          >
            <Icon name="trash" size={20} />
          </button>
          <Button type="submit">Publish</Button>
        </div>
      </div>

      {(isAreasLoading || isCategoriesLoading || isPostingRecipe) && (
        <div className={css['loader-container']}>
          <Loader fullScreen />
        </div>
      )}
    </form>
  );
}
