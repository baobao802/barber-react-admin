import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { Trash } from '../../../components/icons';
import { Loading, Paginator } from '../../../components/ui';
import {
  useGetNotificationsQuery,
  useMarkAsReadNotificationMutation,
  useRemoveNotificationMutation,
} from '../services/notificationsApi';

const Notifications = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('p') || 1);
  const { data, isError, isLoading, refetch } = useGetNotificationsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const toast = useToast();
  const [params, setParams] = useState({});
  const [markAsRead] = useMarkAsReadNotificationMutation();
  const [removeNotification, { isLoading: isRemoving, isSuccess: isRemoved }] =
    useRemoveNotificationMutation();

  useEffect(() => {
    if (isRemoved) {
      toast({
        title: 'Xóa thành công!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRemoved]);

  return (
    <Fragment>
      <Loading isOpen={isRemoving} />
      <Page title='Danh sách người dùng | Brand'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Thông báo
            </Heading>
            <Box>
              {isError ? (
                <Box w='full' bgColor='white' p='3'>
                  <Heading as='h5' color='tomato' mb='3'>
                    Something wrong happen!!!
                  </Heading>
                  <Text color='tomato'>Please reload.</Text>
                </Box>
              ) : isLoading ? (
                <HStack justifyContent='center'>
                  <Spinner
                    thickness='4px'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </HStack>
              ) : data ? (
                <Box>
                  <VStack spacing='2' alignItems='flex-start'>
                    {data.notifications.map(
                      ({
                        id,
                        messageTitle,
                        messageBody,
                        sentAt,
                        bookingId,
                        unread,
                      }) => (
                        <HStack
                          bgColor={unread ? 'white' : 'gray.100'}
                          w='full'
                          px='5'
                          py='3'
                          rounded='lg'
                          spacing='5'
                        >
                          <Box flex='1'>
                            <Link
                              key={id}
                              to={`/bookings/${bookingId}`}
                              style={{ width: '100%' }}
                              onClick={() => markAsRead({ id })}
                            >
                              <Heading
                                as='h5'
                                fontSize='lg'
                                fontWeight='medium'
                                textTransform='capitalize'
                                mb='2'
                              >
                                {messageTitle}
                              </Heading>
                              <Text
                                color='gray'
                                textTransform='capitalize'
                                lineHeight='base'
                                mb='2'
                              >
                                {messageBody}
                              </Text>
                              <Text
                                color='gray.400'
                                fontSize='sm'
                                textTransform='capitalize'
                              >
                                {sentAt}
                              </Text>
                            </Link>
                          </Box>
                          <IconButton
                            aria-label='remove notification'
                            colorScheme='yellow'
                            icon={<Trash width='20' height='20' />}
                            size='sm'
                            onClick={() => removeNotification({ id })}
                          />
                        </HStack>
                      ),
                    )}
                  </VStack>
                  <HStack mt='5' w='full' justifyContent='flex-end'>
                    <Paginator
                      totalPages={data.totalPages}
                      onPageChange={(page) => setParams({ ...params, page })}
                    />
                  </HStack>
                </Box>
              ) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Notifications;
