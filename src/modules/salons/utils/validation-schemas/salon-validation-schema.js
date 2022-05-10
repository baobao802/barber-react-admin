import * as yup from 'yup';

export const salonValidationSchema = yup
  .object({
    firstname: yup.string().required('Bắt buộc!'),
    lastname: yup.string().required('Bắt buộc!'),
    email: yup.string().required().email(),
    password: yup.string().min(6, 'Mật khẩu yếu!'),
    confirmedPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp!'),
    salonName: yup.string().required().min(3, 'Tên quán quá ngắn!'),
    phone: yup.string().required('Bắt buộc!'),
    province: yup
      .object()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required('Bắt buộc!'),
    district: yup
      .object()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required('Bắt buộc!'),
    ward: yup
      .object()
      .shape({
        value: yup.string(),
        label: yup.string(),
      })
      .required('Bắt buộc!'),
    street: yup.string().required('Bắt buộc!'),
    positionUrl: yup.string().url('Link không hợp lệ!'),
  })
  .required();
