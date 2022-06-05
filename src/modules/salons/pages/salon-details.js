import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../components/common';
import Form, { Select, Input, FormGrid } from '../../../components/ui/form';
import {
  useGetProvincesQuery,
  useLazyGetDistrictsByProvinceIdQuery,
  useLazyGetWardsByDistrictIdQuery,
} from '../../../services/provincesApi';
import { selectAuth } from '../../auth/services/authSlice';
import ServicesTable from '../components/ui/table/ServicesTable';
import { useGetSalonByIdQuery } from '../services/salonsApi';
import { useGetSalonServicesQuery } from '../services/salonServicesApi';
import { salonValidationSchema } from '../utils/validation-schemas/salon-validation-schema';

const SalonDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const auth = useSelector(selectAuth);
  const [editable, setEditable] = useState(false);
  const {
    data: salon,
    isLoading: isSalonLoading,
    isSuccess: isSalonSuccess,
    isError: isSalonError,
  } = useGetSalonByIdQuery(auth.data.user?.id);
  // const { data: salonServices } = useGetSalonServicesQuery();
  const {
    data: provinces,
    isLoading: isProvincesLoading,
    isSuccess: isProvincesSuccess,
    isError: isProvincesError,
  } = useGetProvincesQuery();
  const [
    getDistrictsByProvinceId,
    {
      data: districts,
      isLoading: isDistrictsLoading,
      isSuccess: isDistrictsSuccess,
      isError: isDistrictsError,
    },
  ] = useLazyGetDistrictsByProvinceIdQuery();
  const [
    getWardsByDistrictId,
    {
      data: wards,
      isLoading: isWardsLoading,
      isSuccess: isWardSuccess,
      isError: isWardsError,
    },
  ] = useLazyGetWardsByDistrictIdQuery();

  const isLoading =
    isSalonLoading ||
    isProvincesLoading ||
    isDistrictsLoading ||
    isWardsLoading;
  const isSuccess =
    isSalonSuccess && isProvincesSuccess && isDistrictsSuccess && isWardSuccess;
  const isError =
    isSalonError || isProvincesError || isDistrictsError || isWardsError;

  const _onSubmit = async (values) => {
    console.log(values);
  };

  const transformDefaultValues = (salon) => {
    const { province, district, ward, ...rest } = salon;
    return {
      ...rest,
      province: selectedProvince,
      district: selectedDistrict,
      ward: wards.find((w) => w.value.includes(ward)),
    };
  };

  useEffect(() => {
    if (selectedProvince) {
      getDistrictsByProvinceId(selectedProvince.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      getWardsByDistrictId(selectedDistrict.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict]);

  useEffect(() => {
    if (isSalonSuccess && isProvincesSuccess) {
      const provinceFound = provinces.find((p) =>
        p.value.includes(salon.province),
      );
      provinceFound && setSelectedProvince(provinceFound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSalonSuccess, isProvincesSuccess]);

  useEffect(() => {
    if (isDistrictsSuccess) {
      const districtFound = districts.find((d) =>
        d.value.includes(salon.district),
      );

      districtFound && setSelectedDistrict(districtFound);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDistrictsSuccess]);

  // useEffect(() => {
  //   if (status === httpStatus.REJECTED) {
  //     if (!toast.isActive('register')) {
  //       toast.closeAll();
  //       toast({
  //         id: 'register',
  //         title: data?.message || authMessages.SOMETHING_WRONG,
  //         // description: 'Unauthorized.',
  //         status: 'error',
  //         position: 'top-right',
  //         isClosable: true,
  //       });
  //     }
  //   }

  //   if (status === httpStatus.FULFILLED) {
  //     navigate('/login', { replace: true });
  //     toast.closeAll();
  //     toast({
  //       title: authMessages.SIGNUP_SUCCESSFULLY,
  //       // description: 'Welcome back.',
  //       status: 'success',
  //       position: 'top-right',
  //       isClosable: true,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [status]);

  return (
    <Page title={'Quản lý salon | Brand'}>
      <section>
        <Container maxW='container.xl'>
          {isError ? (
            <Box w='full' bgColor='white' p='3'>
              <Heading as='h5' color='tomato' mb='3'>
                Something wrong happen!!!
              </Heading>
              <Text color='tomato'>Please reload.</Text>
            </Box>
          ) : isLoading ? (
            <HStack justifyContent='center' minH='md'>
              <Spinner
                thickness='4px'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </HStack>
          ) : isSuccess ? (
            <Form
              validationSchema={salonValidationSchema}
              defaultValues={transformDefaultValues(salon)}
              onSubmit={_onSubmit}
              w='full'
              alignItems='start'
              spacing='5'
            >
              <Divider />

              <Heading as='h3' fontSize='lg' pt='4'>
                Thông tin salon
              </Heading>
              <FormGrid
                name='personal'
                w='xl'
                display='grid'
                templateColumns='repeat(4, 1fr)'
                gap='5'
              >
                <Input
                  type='text'
                  name='firstname'
                  label='Họ'
                  rounded='none'
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Input
                  type='text'
                  name='lastname'
                  label='Tên'
                  rounded='none'
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Input
                  type='text'
                  name='email'
                  label='Email'
                  rounded='none'
                  disabled
                  colSpan={4}
                />
                <Input
                  type='text'
                  name='salonName'
                  label='Tên Salon'
                  rounded='none'
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Input
                  type='text'
                  name='phone'
                  label='Số điện thoại'
                  rounded='none'
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Select
                  name='province'
                  label='Thành phố/Tỉnh'
                  rounded='none'
                  options={provinces}
                  onChange={(v) => setSelectedProvince(v)}
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Select
                  name='district'
                  label='Quận/Huyện'
                  rounded='none'
                  options={districts}
                  onChange={(v) => setSelectedDistrict(v)}
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Select
                  name='ward'
                  label='Phường/Xã'
                  rounded='none'
                  options={wards}
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Input
                  type='text'
                  name='street'
                  label='Số nhà và đường phố'
                  rounded='none'
                  colSpan={[4, 4, 4, 2]}
                  disabled={!editable}
                />
                <Input
                  type='text'
                  name='positionUrl'
                  label='Google map URL'
                  rounded='none'
                  colSpan={4}
                  disabled={!editable}
                />
                <Text fontSize='xs' colSpan={4}>
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
              </FormGrid>

              {editable ? (
                <HStack>
                  <Button
                    variant='outline'
                    colorScheme='facebook'
                    onClick={() => setEditable(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type='submit'
                    colorScheme='facebook'
                    loadingText='Submitting'
                  >
                    Lưu
                  </Button>
                </HStack>
              ) : (
                <HStack>
                  <Button
                    colorScheme='facebook'
                    onClick={() => setEditable(true)}
                  >
                    Sửa
                  </Button>
                </HStack>
              )}
            </Form>
          ) : null}
        </Container>
      </section>
      <section>
        <Container maxW='container.xl'>
          {isError ? (
            <Box w='full' bgColor='white' p='3'>
              <Heading as='h5' color='tomato' mb='3'>
                Something wrong happen!!!
              </Heading>
              <Text color='tomato'>Please reload.</Text>
            </Box>
          ) : isLoading ? (
            <HStack justifyContent='center' minH='md'>
              <Spinner
                thickness='4px'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </HStack>
          ) : isSuccess ? (
            <VStack w='full' alignItems='start' spacing='5'>
              <Divider mt='5' />

              <Heading as='h3' fontSize='lg' pt='4'>
                Dịch vụ
              </Heading>
              <Box></Box>
              <ServicesTable services={salon.services} />
            </VStack>
          ) : null}
        </Container>
      </section>
    </Page>
  );
};

export default SalonDetails;
