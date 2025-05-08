import React, { useEffect, useMemo, useState } from 'react';
import InputTextCounter from '../InputTextCounter/InputTextCounter';
import Button from '../../Button/Button';
import css from './InputIngredients.module.css';
import Fieldset from '../Fieldset/Fieldset';
import FormTitle from '../FormTitle/FormTitle';
import Icon from '../../Icon/Icon';
import DropdownSearch from '../DropdownSearch/DropdownSearch';
import { fetchIngredients } from '../../../redux/ingredients/operations';
import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsIsLoading,
} from '../../../redux/ingredients/selectors';
import { useDispatch, useSelector } from 'react-redux';
import IngredientsList from '../../IngredientsList/IngredientsList';

export default function InputIngredients() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIngredientsIsLoading);
  const isError = useSelector(selectIngredientsError);
  const allIngredients = useSelector(selectIngredients);

  const [selectedIngredient, setSelectedIngredient] = useState(null); // option
  const [quantity, setQuantity] = useState(''); // measure

  const [ingredients, setIngredients] = useState([]);

  const dropdownOptions = useMemo(() => {
    return allIngredients.map((item) => {
      return {
        value: item._id,
        label: item.name,
        disabled: Boolean(ingredients.find(({ id }) => id === item._id)),
      };
    });
  }, [allIngredients, ingredients]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  // useEffect(() => {
  //   const getAllIngredients = async function () {
  //     try {
  //       // const { data } = await ingredientsAPI.getAll();
  //       const data = [
  //         {
  //           _id: 1,
  //           name: 'Squid',
  //           desc: 'A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 2,
  //           name: 'Cabbage',
  //           desc: 'A leafy green or purple vegetable that is often used in salads, coleslaw, and stir-fry dishes, and is also commonly fermented into sauerkraut.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37f5.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 3,
  //           name: 'Baking Powder',
  //           desc: 'Baking powder is a dry chemical leavening agent, a mixture of a carbonate or bicarbonate and a weak acid. The base and acid are prevented from reacting prematurely by the inclusion of a buffer such as cornstarch. Baking powder is used to increase the volume and lighten the texture of baked goods. It works by releasing carbon dioxide gas into a batter or dough through an acid-base reaction, causing bubbles in the wet mixture to expand and thus leavening the mixture. The first single-acting baking powder was developed by Birmingham based food manufacturer Alfred Bird in England in 1843. The first double-acting baking powder was developed by Eben Norton Horsford in America in the 1860s.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3665.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 4,
  //           name: 'Smoked Haddock',
  //           desc: 'Haddock that has been smoked over wood chips, giving it a distinctive smoky flavor',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3804.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 5,
  //           name: 'Pears',
  //           desc: 'A sweet and juicy fruit with a soft, grainy texture and thin skin.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e382c.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 6,
  //           name: 'Spring Onions',
  //           desc: 'Also known as scallions or green onions, these are young onions that have a mild flavor and are commonly used as a garnish or ingredient in salads, soups, stir-fries, and other dishes.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3770.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 7,
  //           name: 'Ginger Cordial',
  //           desc: 'A sweet and spicy syrup made from ginger often used as a mixer in cocktails or diluted with water to make a non-alcoholic drink.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36e9.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 8,
  //           name: 'Almond Extract',
  //           desc: 'The almond (Prunus dulcis, syn. Prunus amygdalus) is a species of tree native to Mediterranean climate regions of the Middle East, but widely cultivated elsewhere. The almond is also the name of the edible and widely cultivated seed of this tree. Within the genus Prunus, it is classified with the peach in the subgenus Amygdalus, distinguished from the other subgenera by corrugations on the shell (endocarp) surrounding the seed.\r\n\r\nThe fruit of the almond is a drupe, consisting of an outer hull and a hard shell with the seed, which is not a true nut, inside. Shelling almonds refers to removing the shell to reveal the seed. Almonds are sold shelled or unshelled. Blanched almonds are shelled almonds that have been treated with hot water to soften the seedcoat, which is then removed to reveal the white embryo.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3861.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 9,
  //           name: 'Tinned Tomatos',
  //           desc: 'Tinned tomatoes are tomatoes that have been canned or preserved in a liquid. They are commonly used in sauces, soups, stews, and other culinary applications.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37e8.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //         {
  //           _id: 10,
  //           name: 'Minced Beef',
  //           desc: 'Ground beef, commonly used for making burgers, meatballs, and meat sauces.',
  //           img: 'https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37c2.png',
  //           createdAt: '2025-05-04T18:25:32.060Z',
  //           updatedAt: '2025-05-04T18:25:32.060Z',
  //         },
  //       ];
  //       console.log(data);
  //       return setAllIngredients(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAllIngredients();
  // }, []);

  const quantityOnChange = (event) => {
    let { value } = event.target;
    if (value.length > 30) value = value.substring(0, 30);
    setQuantity(value);
  };

  const onSelectChange = (selectedValue) => {
    // console.log(selectedValue);
    setSelectedIngredient(selectedValue);
  };

  const onClick = () => {
    if (selectedIngredient && quantity.length > 1) {
      setIngredients((prevState) => {
        return [...prevState, { id: selectedIngredient.value, quantity }];
      });
      setSelectedIngredient(null);
      setQuantity('');
    }
  };

  // TODO: replace with reuseable element when ready
  const ingredientsToRender = useMemo(() => {
    return ingredients.map(({ id, quantity }) => {
      const originalIngredient = allIngredients.find((item) => item._id === id);
      return {
        ...originalIngredient,
        recipe_ingredient: { measure: quantity },
      };
    });
  }, [allIngredients, ingredients]);

  return (
    <Fieldset className={css['fieldset-ingredients']}>
      <FormTitle>Add Ingredients</FormTitle>
      <div className={css['media-wrapper-row-ingredient']}>
        <DropdownSearch
          onChange={onSelectChange}
          value={selectedIngredient}
          options={dropdownOptions}
          placeholder="Select placeholder"
          isDisabled={isError && isLoading}
        />

        <InputTextCounter
          name="ingredient-quantity"
          isCounter={false}
          isOneRow={true}
          className={css['ingredients-margin-bottom-input']}
          placeholder="Enter quantity"
          value={quantity}
          onChange={quantityOnChange}
        />
      </div>
      <Button variant="outline" type="button" onClick={onClick}>
        Add ingredient
        <Icon name="plus" />
      </Button>

      <div className={css['ingredients-list-wrapper']}>
        <IngredientsList ingredients={ingredientsToRender} animation />;
      </div>
    </Fieldset>
  );
}
