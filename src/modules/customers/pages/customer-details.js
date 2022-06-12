import {
  Avatar,
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Text,
} from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { Form, Input } from '../../../components/ui/form';
import { useGetCustomerByIdQuery } from '../services/customersApi';

const CustomerDetails = (props) => {
  const { customerId } = useParams();
  const [isActive, setIsActive] = useState(false);
  const { data, error, isLoading } = useGetCustomerByIdQuery(customerId, {
    refetchOnMountOrArgChange: true,
  });

  const defaultValues = data
    ? {
        fullName: `${data.firstname} ${data.lastname}`,
        username: data.username,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        fullAddress: data.address?.fullAddress,
        isActive: data.isActive,
      }
    : {};

  useEffect(() => {
    if (data) {
      setIsActive(data.isActive);
    }
  }, [data]);

  if (error) {
    return (
      <Page title='Có lỗi xảy ra!!!'>
        <Box w='full' bgColor='white' p='3'>
          <Heading as='h5' color='tomato' mb='3'>
            Something wrong happen!!!
          </Heading>
          <Text color='tomato'>Please reload.</Text>
        </Box>
      </Page>
    );
  }

  if (isLoading) {
    return (
      <Page title='Đang lấy dữ liệu'>
        <HStack justifyContent='center'>
          <Spinner
            thickness='4px'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </HStack>
      </Page>
    );
  }

  if (!data) {
    return <Fragment></Fragment>;
  }

  return (
    <Page title={`${data.firstname} ${data.lastname}`}>
      <section>
        <Container maxW='container.xl'>
          <HStack alignItems='flex-start' mt='12' spacing='8'>
            <Box w='xs'>
              <Avatar size='full' src={data.avatar} />
            </Box>
            <Form
              defaultValues={defaultValues}
              w='full'
              alignItems='start'
              spacing='5'
            >
              <Input
                variant='flushed'
                type='text'
                name='fullName'
                label='Họ và tên'
                disabled
              />
              <FormControl>
                <FormLabel htmlFor='isActive'>Giới tính</FormLabel>
                <RadioGroup
                  name='gender'
                  defaultValue={defaultValues.gender}
                  isDisabled
                >
                  <HStack spacing='8'>
                    <Radio colorScheme='facebook' value='male'>
                      Nam
                    </Radio>
                    <Radio colorScheme='facebook' value='female'>
                      Nữ
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Input
                variant='flushed'
                type='text'
                name='username'
                label='Username'
                disabled
              />
              <Input variant='flushed' type='text' name='email' label='Email' />
              <Input
                variant='flushed'
                type='number'
                name='phone'
                label='Số điện thoại'
                disabled
              />
              <Input
                variant='flushed'
                type='text'
                name='fullAddress'
                label='Địa chỉ'
                disabled
              />
              <FormControl>
                <FormLabel htmlFor='isActive'>Đang hoạt động?</FormLabel>
                <Switch
                  id='isActive'
                  colorScheme='green'
                  py='1'
                  isChecked={isActive}
                />
              </FormControl>
            </Form>
          </HStack>
        </Container>
      </section>
    </Page>
  );
};

export default CustomerDetails;
