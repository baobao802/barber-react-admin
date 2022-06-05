import {
  Button,
  Container,
  Heading,
  Image,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link as ReactLink } from 'react-router-dom';
import { Page } from '../../../components/common';
import { Form, Input } from '../../../components/ui/form';
import { loginValidationSchema } from '../utils/validation-schemas';
import { messages as authMessages } from '../constants';
import { login, selectAuth } from '../services/authSlice';
import { httpStatus } from '../../../constant';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { data, status } = useSelector(selectAuth);

  const from = location.state?.from?.pathname || '/';

  const _onSubmit = async (values) => {
    await dispatch(
      login({
        mixin_id: values.email,
        password: values.password,
      }),
    );
  };

  useEffect(() => {
    if (status === httpStatus.REJECTED) {
      if (!toast.isActive('unauthorized')) {
        toast.closeAll();
        toast({
          id: 'unauthorized',
          title: data?.message || authMessages.UNAUTHORIZED,
          // description: 'Unauthorized.',
          status: 'error',
          position: 'top-right',
          duration: null,
          isClosable: true,
        });
      }
    }

    if (status === httpStatus.FULFILLED) {
      navigate(from, { replace: true });
      toast.closeAll();
      toast({
        title: authMessages.AUTHORIZED,
        // description: 'Welcome back.',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Page title='Đăng nhập | Brand'>
      <section>
        <Container
          maxW='md'
          minH='100vh'
          display='flex'
          flexDir='column'
          alignItems='center'
          justifyContent='center'
        >
          <VStack
            w='full'
            alignItems='flex-start'
            spacing='5'
            p='8'
            shadow='md'
          >
            <Image src='/logo.svg' alt='Brand' h='12' w='auto' />

            <Heading as='h2' fontSize='xl'>
              Đăng nhập
            </Heading>

            <Form
              validationSchema={loginValidationSchema}
              onSubmit={_onSubmit}
              w='full'
              alignItems='start'
              spacing='3'
            >
              <Input
                type='text'
                name='email'
                placeholder='Nhập vào email'
                rounded='none'
              />
              <Input
                type='password'
                name='password'
                placeholder='Nhập vào mật khẩu'
                rounded='none'
              />
              <Button
                type='submit'
                colorScheme='facebook'
                isLoading={status === httpStatus.PENDING}
                loadingText='Submitting'
              >
                Đăng nhập
              </Button>
            </Form>

            <Text>
              Bạn chưa có tài khoản?{' '}
              <Link as={ReactLink} to='/signup' color='blue'>
                Đăng ký
              </Link>
              .
            </Text>
          </VStack>
        </Container>
      </section>
    </Page>
  );
};

export default Login;
