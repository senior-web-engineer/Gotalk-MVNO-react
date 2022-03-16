import * as yup from 'yup';

export const userSchema = () => yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  lastName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  email: yup.string().email('This is not an email').required('This field is required'),
  password: yup
    .string()
    .min(8, 'Must contain at least 8 characters')
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      'Must contain one uppercase, one lowercase, one number and one special case character',
    )
    .required('This field is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup.string().nullable().notRequired(),
  street: yup.string().nullable(),
  country: yup.string().nullable(),
  zip: yup
    .string()
    .min(5, 'Must contain exactly 5 characters')
    .max(5, 'Must contain exactly 5 characters')
    .required('This field is required'),
});

export const billingUserSchema = () => yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  lastName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  email: yup.string().email('This is not an email').required('This field is required'),
  password: yup
    .string()
    .min(8, 'Must contain at least 8 characters')
    .required('This field is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup.string().nullable().notRequired(),
  apartment: yup.string().nullable().notRequired(),
  street: yup.string().required('This field is required'),
  city: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
  zip: yup
    .string()
    .min(5, 'Must contain exactly 5 characters')
    .max(5, 'Must contain exactly 5 characters')
    .required('This field is required'),
});

export const deliverySchema = () => yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  lastName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  apartment: yup.string().nullable().notRequired(),
  street: yup.string().required('This field is required'),
  city: yup.string().required('This field is required'),
  country: yup.string().required('This field is required'),
  zip: yup
    .string()
    .min(5, 'Must contain exactly 5 characters')
    .max(5, 'Must contain exactly 5 characters')
    .required('This field is required'),
});

export const emptySchema = () => yup.object().shape({});

export const userEditSchema = () => yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  lastName: yup
    .string()
    .min(2, 'Must contain at least 2 characters')
    .required('This field is required'),
  phone: yup.string().nullable().notRequired(),
  email: yup.string().email('This is not an email').required('This field is required'),
  street: yup.string().nullable(),
  city: yup.string(),
  town: yup.string(),
  apartment: yup.string().nullable(),
  zip: yup.string().nullable(),
  emailFactor: yup.boolean(),
  yubicoFactor: yup.boolean(),
});

export const userEditPasswordSchema = () => yup.object().shape({
  password: yup
    .string()
    .min(6, 'Must contain at least 6 characters')
    .required('This field is required'),
  newPassword: yup
    .string()
    .min(6, 'Must contain at least 6 characters')
    .notOneOf([yup.ref('password')], 'Passwords must not match')
    .required('This field is required'),
  newPasswordConfirm: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

export const addYubikeySchema = () => yup.object().shape({
  clientId: yup.string().required('This field is required'),
  secretKey: yup.string().required('This field is required'),
  yubicoFactor: yup.string().required('This field is required'),
});
