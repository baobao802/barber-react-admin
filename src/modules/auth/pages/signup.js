import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { Page } from '../../../components/common';
import { Form, Input, Select } from '../../../components/ui/form';
import {
  signupValidationSchema,
  barberValidationSchema,
} from '../utils/validation-schemas';
import { messages as authMessages } from '../constants';
import { signup, selectAuth, resetStatus } from '../services/authSlice';
import { Step, Steps } from '../components/ui';
import { httpStatus } from '../../../constant';
import {
  useGetProvincesQuery,
  useLazyGetDistrictsByProvinceIdQuery,
  useLazyGetWardsByDistrictIdQuery,
} from '../../../services/provincesApi';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { data, status } = useSelector(selectAuth);
  const [activeStep, setActiveStep] = useState(0);
  const [payloads, setPayloads] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const { data: provinces } = useGetProvincesQuery();
  const [getDistrictsByProvinceId, { data: districts }] =
    useLazyGetDistrictsByProvinceIdQuery();
  const [getWardsByDistrictId, { data: wards }] =
    useLazyGetWardsByDistrictIdQuery();

  const _onAccountSubmit = async (values) => {
    // save values to state
    setPayloads({ ...payloads, ...values });
    setActiveStep(activeStep + 1);
  };

  const _onSubmit = async (values) => {
    const obj = {
      ...payloads,
      ...values,
    };
    console.log(selectedProvince);
    await dispatch(
      signup({
        email: obj.email,
        password: obj.password,
        first_name: obj.firstname,
        last_name: obj.lastname,
        salon_name: obj.salonName,
        phone_number: obj.phone,
        address: {
          hamlet: obj.street,
          ward: obj.ward.value,
          district: selectedDistrict.value,
          province: selectedProvince.value,
        },
        address_url: obj.positionUrl,
      }),
    );
  };

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceId = provinces?.find(
        (p) => p.value === selectedProvince.value,
      )?.id;
      selectedProvinceId && getDistrictsByProvinceId(selectedProvinceId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictId = districts?.find(
        (p) => p.value === selectedDistrict.value,
      )?.id;
      selectedDistrictId && getWardsByDistrictId(selectedDistrictId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  useEffect(() => {
    if (status === httpStatus.REJECTED) {
      if (!toast.isActive('register')) {
        toast.closeAll();
        toast({
          id: 'register',
          title: data?.message || authMessages.SOMETHING_WRONG,
          // description: 'Unauthorized.',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      }
    }

    if (status === httpStatus.FULFILLED) {
      dispatch(resetStatus());
      navigate('/login', { replace: true });
      toast.closeAll();
      toast({
        title: authMessages.SIGNUP_SUCCESSFULLY,
        // description: 'Welcome back.',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Page title='Đăng ký | Brand'>
      <section>
        <Container
          maxW='2xl'
          minH='100vh'
          display='flex'
          flexDir='column'
          alignItems='center'
          justifyContent='center'
        >
          <Steps offset={activeStep}>
            <Step>
              <VStack
                w='md'
                alignItems='start'
                spacing='5'
                p='8'
                m='3'
                shadow='md'
              >
                <Image src='/logo.svg' alt='Brand' h='12' w='auto' />

                <Heading as='h2' fontSize='xl'>
                  Đăng ký
                </Heading>

                <Form
                  validationSchema={signupValidationSchema}
                  onSubmit={_onAccountSubmit}
                  w='full'
                  alignItems='start'
                  spacing='5'
                >
                  <Input
                    type='text'
                    name='firstname'
                    placeholder='Họ'
                    rounded='none'
                  />
                  <Input
                    type='text'
                    name='lastname'
                    placeholder='Tên'
                    rounded='none'
                  />
                  <Input
                    type='text'
                    name='email'
                    placeholder='Email'
                    rounded='none'
                  />
                  <Input
                    type='password'
                    name='password'
                    placeholder='Mật khẩu'
                    rounded='none'
                  />
                  <Input
                    type='password'
                    name='confirmedPassword'
                    placeholder='Xác nhận mật khẩu'
                    rounded='none'
                  />
                  <Button
                    type='submit'
                    colorScheme='facebook'
                    // isLoading={status === 'pending'}
                    // loadingText='Submitting'
                  >
                    Tiếp tục
                  </Button>
                </Form>

                <Text>
                  Bạn đã có tài khoản?{' '}
                  <Link as={ReactLink} to='/login' color='blue'>
                    Đăng nhập
                  </Link>
                  .
                </Text>
              </VStack>
            </Step>
            <Step>
              <VStack
                w='full'
                alignItems='start'
                spacing='5'
                p='8'
                m='3'
                shadow='md'
              >
                <Heading as='h2' fontSize='xl'>
                  Tạo thông tin salon
                </Heading>

                <Form
                  validationSchema={barberValidationSchema}
                  onSubmit={_onSubmit}
                  w='full'
                  alignItems='start'
                  spacing='5'
                >
                  <Input
                    type='text'
                    name='salonName'
                    placeholder='Tên Salon'
                    rounded='none'
                  />
                  <Input
                    type='text'
                    name='phone'
                    placeholder='Số điện thoại'
                    rounded='none'
                  />
                  <Select
                    name='province'
                    placeholder='Thành phố/Tỉnh'
                    rounded='none'
                    options={provinces}
                    onChange={(v) => setSelectedProvince(v)}
                  />
                  <Select
                    name='district'
                    placeholder='Quận/Huyện'
                    rounded='none'
                    options={districts}
                    onChange={(v) => setSelectedDistrict(v)}
                  />
                  <Select
                    name='ward'
                    placeholder='Phường/Xã'
                    rounded='none'
                    options={wards}
                  />
                  <Input
                    type='text'
                    name='street'
                    placeholder='Số nhà và đường phố'
                    rounded='none'
                  />
                  <Input
                    type='text'
                    name='positionUrl'
                    placeholder='Google map URL'
                    rounded='none'
                  />
                  <Text fontSize='xs'>
                    Di chuyển đến{' '}
                    <Link
                      href='https://www.google.com/maps/place/Vi%E1%BB%87t+Nam/@15.7477194,101.4132682,6z/data=!3m1!4b1!4m5!3m4!1s0x31157a4d736a1e5f:0xb03bb0c9e2fe62be!8m2!3d14.058324!4d108.277199'
                      color='blue'
                      target='_blank'
                    >
                      google map
                    </Link>{' '}
                    để tìm kiếm địa chỉ của bạn và nhập link chia sẻ.
                  </Text>
                  <HStack>
                    <Button
                      colorScheme='facebook'
                      variant='outline'
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Quay lại
                    </Button>
                    <Button
                      type='submit'
                      colorScheme='facebook'
                      isLoading={status === 'pending'}
                      loadingText='Đang gửi'
                    >
                      Đăng ký
                    </Button>
                  </HStack>
                </Form>
              </VStack>
            </Step>
          </Steps>
        </Container>
      </section>
    </Page>
  );
};

export default Signup;
