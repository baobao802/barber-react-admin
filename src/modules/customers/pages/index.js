import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Link as ReactLink, useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { CustomersTable } from '../components/ui/table';
import { useGetCustomersQuery } from '../services/customersApi';

const Customers = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('p') || 1);
  const { data, error, isLoading, refetch } = useGetCustomersQuery(page);

  return (
    <Fragment>
      <Page title='Danh sách người dùng | Brand'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Danh sách người dùng
            </Heading>
            {/* <HStack justifyContent='flex-end' mb='3'>
              <Button
                as={ReactLink}
                to='/users/create'
                state={{ backgroundLocation: location }}
                colorScheme='green'
                borderRadius='none'
              >
                Create
              </Button>
            </HStack> */}
            <Box>
              {error ? (
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
                <CustomersTable customers={data.customers} refresh={refetch} />
              ) : null}
            </Box>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Customers;
