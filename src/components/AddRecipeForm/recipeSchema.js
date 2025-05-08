import * as yup from 'yup';

const MAX_FILE_SIZE = 10_485_760; // 10 Megabyte
const MAX_STRING_LENGTH = 200;

export const recipeSchema = yup.object({
  // email: yup
  //   .string()
  //   .matches(emailRegexp, {
  //     message: ERROR_MESSAGES.INVALID_EMAIL,
  //   })
  //   .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  // password: yup.string().required(ERROR_MESSAGES.PASSWORD_IS_REQUIRED),
  photo: yup
    .mixed()
    .required('Required')
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
    .required('Title is Required')
    .min(1)
    .max(MAX_STRING_LENGTH),
  description: yup
    .string()
    .required('Description is Required')
    .min(1)
    .max(MAX_STRING_LENGTH),
  category: yup.string().required('Category is Required'),
  time: yup.number().min(1).required('Time is Required'),
  area: yup.number().required('Time is Required'),
  ingredients: yup
    .array()
    .of(yup.object())
    .min(1)
    .required('Ingredients is Required'),
  preparation: yup
    .string()
    .required('Preparation is Required')
    .min(1)
    .max(MAX_STRING_LENGTH),
});

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
