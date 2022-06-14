import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import React, { Fragment, useEffect } from 'react';
import { useParams, Link as ReactLink } from 'react-router-dom';
import { Page } from '../../../components/common';
import { ArrowBack, CheckCircle } from '../../../components/icons';
import {
  useAcceptBookingMutation,
  useGetBookingByIdQuery,
  useRequestToCompleteBookingMutation,
} from '../services/bookingsApi';
import { formatCurrency } from '../../../utils/transform';
import dayjs from 'dayjs';
import { bookingStatusMapper } from '../utils/mappers';

const BookingDetails = (props) => {
  const { bookingId } = useParams();
  const { data, error, isLoading, refetch } = useGetBookingByIdQuery(bookingId);
  const [acceptBooking, { isSuccess: isConfirmed, isLoading: isConfirming }] =
    useAcceptBookingMutation();
  const [
    requestToCompleteBooking,
    { isSuccess: isCompleted, isLoading: isRequesting },
  ] = useRequestToCompleteBookingMutation();
  const toast = useToast();

  useEffect(() => {
    if (isConfirmed) {
      toast({
        status: 'success',
        title: 'Xác nhận thành công!',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  useEffect(() => {
    if (isCompleted) {
      toast({
        status: 'success',
        title: 'Gửi yêu cầu thành công!',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted]);

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
    <Page title={``}>
      <section>
        <Container maxW='container.xl' backgroundColor='white'>
          <HStack py='5' alignItems='center' spacing='4'>
            <IconButton
              as={ReactLink}
              to='/bookings/history'
              aria-label='Show order detail'
              variant='outline'
              colorScheme='facebook'
              icon={<ArrowBack width='16' height='16' />}
              rounded='full'
              size='sm'
            />
          </HStack>
          <HStack alignItems='center' justifyContent='flex-end' spacing='4'>
            {data.status === 'new' && (
              <Button
                aria-label='accept booking'
                colorScheme='green'
                leftIcon={<CheckCircle />}
                borderRadius='none'
                onClick={() => acceptBooking(data.id)}
                isLoading={isConfirming}
              >
                Xác nhận
              </Button>
            )}
            {data.status === 'confirmed' && (
              <Button
                aria-label='complete booking'
                colorScheme='facebook'
                leftIcon={<CheckCircle />}
                borderRadius='none'
                onClick={() => requestToCompleteBooking(data.id)}
                isLoading={isRequesting}
              >
                Complete
              </Button>
            )}
          </HStack>
          <Box py='5' lineHeight='taller'>
            <Text color='gray'>
              Khách hàng: {`${data.user.firstname} ${data.user.lastname}`}
            </Text>
            <Text color='gray'>Số điện thoại: {data.user.phone}</Text>
            <Text color='gray'>
              Trạng thái:{' '}
              <Badge variant='outline'>
                {bookingStatusMapper(data.status)}
              </Badge>
            </Text>
            <Text color='gray'>Thời gian đặt lịch: </Text>
            <Text color='gray'>
              Thời gian hoàn thành:{' '}
              {dayjs(data.updatedAt).format('HH:mm, DD-MM-YYYY')}
            </Text>
            {data.services && (
              <Text color='gray'>
                Dịch vụ:
                <UnorderedList pl='4'>
                  {data.services.map(({ id, servicePrice, serviceName }) => (
                    <ListItem>
                      {serviceName} - {formatCurrency(servicePrice)}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Text>
            )}
            <Text color='gray'>
              Tổng thanh toán:{' '}
              <Text as='span' color='green.600' fontWeight='bold'>
                {formatCurrency(data.totalPrice)}
              </Text>
            </Text>
          </Box>
        </Container>
      </section>
    </Page>
  );
};

export default BookingDetails;
