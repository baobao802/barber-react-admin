import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { BookingsTable } from '../components/ui/table';
import { useGetBookingsQuery } from '../services/bookingsApi';

const Bookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('p') || 1);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const { data, isError, isLoading, refetch } = useGetBookingsQuery({
    search,
    status,
    page,
  });

  return (
    <Fragment>
      <Page title='Danh sách người dùng | Brand'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Lịch sử khách hàng
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
                <BookingsTable
                  bookings={data.bookings}
                  totalPages={data.totalPages}
                  refresh={refetch}
                  onParamsChange={(params) => setSearchParams(params)}
                />
              ) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Bookings;
