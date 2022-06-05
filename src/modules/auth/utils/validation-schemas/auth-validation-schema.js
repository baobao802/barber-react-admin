import * as yup from 'yup';

export const loginValidationSchema = yup
  .object({
    email: yup.string().email().required('Vui lòng nhập email!'),
    password: yup.string().required('Vui lòng nhập mật khẩu!'),
  })
  .required();

export const signupValidationSchema = yup
  .object({
    email: yup.string().email().required('Vui lòng nhập email!'),
    password: yup
      .string()
      .min(6, 'Mật khẩu yếu!')
      .required('Vui lòng nhập mật khẩu!'),
    confirmedPassword: yup
      .string()
      .required('Vui lòng xác thực mật khẩu!')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp!'),
  })
  .required();
