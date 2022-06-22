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
  Input as ChakraInput,
  FormLabel,
  SimpleGrid,
  Image,
  Avatar,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import Form, { Select, Input, FormGrid } from '../../../components/ui/form';
import {
  useGetProvincesQuery,
  useLazyGetDistrictsByProvinceIdQuery,
  useLazyGetWardsByDistrictIdQuery,
} from '../../../services/provincesApi';
import { selectAuth } from '../../auth/services/authSlice';
import ServicesTable from '../components/ui/table/ServicesTable';
import {
  useGetSalonByIdQuery,
  useGetSalonImagesQuery,
  useUpdateSalonByIdMutation,
  useUploadImagesMutation,
} from '../services/salonsApi';
import { salonValidationSchema } from '../utils/validation-schemas/salon-validation-schema';

const SalonDetails = (props) => {
  const toast = useToast();
  const { salonId } = useParams();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const auth = useSelector(selectAuth);
  const [editable, setEditable] = useState(false);

  const isSalon = auth.data.user.is_salon;
  const {
    data: salon,
    isLoading: isSalonLoading,
    isSuccess: isSalonSuccess,
    isError: isSalonError,
    refetch: refreshSalon,
  } = useGetSalonByIdQuery(isSalon ? auth.data.user.id : salonId);
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
  const [updateSalonById, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateSalonByIdMutation();
  const [
    uploadImages,
    { isError: isUploadError, isLoading: isUploading, isSuccess: isUploaded },
  ] = useUploadImagesMutation();
  const {
    data: photos,
    isLoading: isPhotosLoading,
    isSuccess: isPhotosSuccess,
    isError: isPhotosError,
    refetch: refreshGallery,
  } = useGetSalonImagesQuery(isSalon ? auth.data.user.id : salonId);

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
    const id = isSalon ? auth.data.user.id : salonId;
    const formData = new FormData();
    formData.append('phone_number', values.phone);
    formData.append('salon_name', values.salonName);
    formData.append('first_name', values.firstname);
    formData.append('last_name', values.lastname);
    updateSalonById({ id, payload: formData });
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

  const handleUploadGallery = (e) => {
    const files = e.target.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }
    const id = isSalon ? auth.data.user.id : salonId;
    uploadImages({ salonId: id, payload: formData });
  };

  const handleUploadAvatar = (e) => {
    const files = e.target.files;
    let formData = new FormData();
    formData.append('avatar', files[0]);
    const id = isSalon ? auth.data.user.id : salonId;
    updateSalonById({ id, payload: formData });
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

  useEffect(() => {
    if (isUpdated) {
      toast({
        title: 'Cập nhật thành công!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      setEditable(false);
      refreshSalon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  useEffect(() => {
    if (isUploaded) {
      toast({
        title: 'Tải ảnh thành công!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      refreshGallery();
    }

    if (isUploadError) {
      toast({
        title: 'Tải ảnh bị lỗi!',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUploaded, isUploadError]);

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
            <Box>
              <Heading as='h3' fontSize='lg' pt='4' pb='8'>
                Thông tin salon
              </Heading>
              <HStack spacing='5' alignItems='start'>
                <VStack w='xs' alignItems='center'>
                  <Avatar w='48' h='48' src={salon.avatar} />
                  <Button p='0'>
                    <FormLabel
                      htmlFor='upload-avatar-btn'
                      m='0'
                      fontWeight='bold'
                      cursor='pointer'
                      px='4'
                      py='2'
                    >
                      Upload
                    </FormLabel>
                    <ChakraInput
                      type='file'
                      id='upload-avatar-btn'
                      hidden
                      onChange={handleUploadAvatar}
                    />
                  </Button>
                </VStack>

                <Form
                  validationSchema={salonValidationSchema}
                  defaultValues={transformDefaultValues(salon)}
                  onSubmit={_onSubmit}
                  w='full'
                  alignItems='start'
                  spacing='5'
                >
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
                        isLoading={isUpdating}
                      >
                        Lưu
                      </Button>
                    </HStack>
                  ) : (
                    <HStack>
                      <Button
                        colorScheme='facebook'
                        onClick={() => setEditable(true)}
                        disabled={!isSalon}
                      >
                        Sửa
                      </Button>
                    </HStack>
                  )}
                </Form>
              </HStack>
            </Box>
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
              <ServicesTable isEditable={isSalon} services={salon.services} />
            </VStack>
          ) : null}
        </Container>
      </section>
      <section>
        <Container maxW='container.xl'>
          {isPhotosError ? (
            <Box w='full' bgColor='white' p='3'>
              <Heading as='h5' color='tomato' mb='3'>
                Something wrong happen!!!
              </Heading>
              <Text color='tomato'>Please reload.</Text>
            </Box>
          ) : isPhotosLoading ? (
            <HStack justifyContent='center' minH='md'>
              <Spinner
                thickness='4px'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </HStack>
          ) : isPhotosSuccess ? (
            <VStack w='full' alignItems='start' spacing='5'>
              <Divider mt='5' />

              <HStack w='full' justifyContent='space-between'>
                <Heading as='h3' fontSize='lg' pt='4'>
                  Hình ảnh
                </Heading>
                <Button p='0' isLoading={isUploading}>
                  <FormLabel
                    htmlFor='upload-btn'
                    m='0'
                    fontWeight='bold'
                    cursor='pointer'
                    px='4'
                    py='2'
                  >
                    Upload
                  </FormLabel>
                  <ChakraInput
                    type='file'
                    id='upload-btn'
                    hidden
                    multiple
                    onChange={handleUploadGallery}
                  />
                </Button>
              </HStack>
              <SimpleGrid w='full' minChildWidth='320px' spacing='20px'>
                {photos?.map((photo) => (
                  <Box height='180px'>
                    <Image
                      key={photo.id}
                      src={photo.url}
                      w='full'
                      h='full'
                      objectFit='cover'
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          ) : null}
        </Container>
      </section>
    </Page>
  );
};

export default SalonDetails;
