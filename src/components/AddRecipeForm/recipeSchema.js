import * as yup from 'yup';
import {
  MESSAGE_IS_REQUIRED,
  MAX_FILE_SIZE,
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MIN_INGREDIENTS_COUNT,
  MIN_TIME,
  MESSAGE_MIN_TIME,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_INSTRUCTIONS_LENGTH,
  MAX_INSTRUCTIONS_LENGTH,
} from '../../constants/recipeForm';

const selectShape = yup.object({
  value: yup.number().required(),
  label: yup.string().required(),
});

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
    .min(MIN_TITLE_LENGTH)
    .max(MAX_TITLE_LENGTH),
  description: yup
    .string()
    .required(MESSAGE_IS_REQUIRED('Description'))
    .min(MIN_DESCRIPTION_LENGTH)
    .max(MAX_DESCRIPTION_LENGTH),
  category: selectShape
    .required(MESSAGE_IS_REQUIRED('Category'))
    .typeError(MESSAGE_IS_REQUIRED('Category')),
  time: yup
    .number()
    .min(MIN_TIME, MESSAGE_MIN_TIME)
    .required(MESSAGE_IS_REQUIRED('Time')),
  area: selectShape
    .required(MESSAGE_IS_REQUIRED('Area'))
    .typeError(MESSAGE_IS_REQUIRED('Area')),
  ingredients: yup
    .array()
    .of(
      yup.object(
        {
          id: yup.number().required(),
          quantity: yup.string().required(),
        },
        MESSAGE_IS_REQUIRED('Ingredients')
      )
    )
    .min(MIN_INGREDIENTS_COUNT)
    .required(MESSAGE_IS_REQUIRED('Ingredients')),
  preparation: yup
    .string()
    .required(MESSAGE_IS_REQUIRED('Preparation'))
    .min(MIN_INSTRUCTIONS_LENGTH)
    .max(MAX_INSTRUCTIONS_LENGTH),
});
