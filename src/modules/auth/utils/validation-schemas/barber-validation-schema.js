import * as yup from 'yup';

export const barberValidationSchema = yup
  .object({
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
    positionUrl: yup.string().required('Bắt buộc').url('Link không hợp lệ!'),
  })
  .required();
