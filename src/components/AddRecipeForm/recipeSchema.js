import * as yup from 'yup';
import {
  MESSAGE_IS_REQUIRED,
  MAX_FILE_SIZE,
  MAX_STRING_LENGTH,
  MIN_STRING_LENGTH,
  MIN_INGREDIENTS_COUNT,
  MIN_TIME,
  MESSAGE_MIN_TIME,
} from '../../constants/recipeForm';

export const recipeSchema = yup.object({
  photo: yup
    .mixed()
    .required(MESSAGE_IS_REQUIRED('Photo'))
    .test(
      'is-valid-type',
      'Not a valid image type',
      (value) => value && value.type.includes('image/')
    )
    .test(
      'is-valid-size',
      'Max allowed size is 10 Megabyte',
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
  title: yup
    .string()
    .required(MESSAGE_IS_REQUIRED('Title'))
    .min(MIN_STRING_LENGTH)
    .max(MAX_STRING_LENGTH),
  description: yup
    .string()
    .required(MESSAGE_IS_REQUIRED('Description'))
    .min(MIN_STRING_LENGTH)
    .max(MAX_STRING_LENGTH),
  category: yup.object().required(MESSAGE_IS_REQUIRED('Category')),
  time: yup
    .number()
    .min(MIN_TIME, MESSAGE_MIN_TIME)
    .required(MESSAGE_IS_REQUIRED('Time')),
  area: yup.object().required(MESSAGE_IS_REQUIRED('Area')),
  ingredients: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        quantity: yup.string().required(),
      })
    )
    .min(MIN_INGREDIENTS_COUNT)
    .required(MESSAGE_IS_REQUIRED('Ingredients')),
  preparation: yup
    .string()
    .required(MESSAGE_IS_REQUIRED('Preparation'))
    .min(MIN_STRING_LENGTH)
    .max(MAX_STRING_LENGTH),
});

let x = {
  photo: {
    path: './chicken-kiev.jpg.webp',
    relativePath: './chicken-kiev.jpg.webp',
  },
  title: 'Title',
  description: 'text 1',
  category: {
    value: 12,
    label: 'Breakfast',
  },
  time: 5,
  area: {
    value: 1,
    label: 'Ukrainian',
  },
  ingredients: [
    {
      id: 1,
      quantity: '100 g',
    },
  ],
  preparation: 'text 2',
};

// {
//       photo: '', // thumb
//       title: '',
//       description: '',
//       category: '',
//       time: 0,
//       area: '', // ???
//       'ingredient-quantity': '',
//       preparation: '', // instructions
//     },
