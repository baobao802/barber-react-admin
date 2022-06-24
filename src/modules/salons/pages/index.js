import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { SalonsTable } from '../components/ui/table';
import { useGetSalonsQuery } from '../services/salonsApi';

const Salons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const { data, error, isLoading, refetch } = useGetSalonsQuery({
    search,
    status,
    page,
  });

  return (
    <Fragment>
      <Page title='Danh sách salon | Brand'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Danh sách salon
            </Heading>
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
                <SalonsTable
                  salons={data.salons}
                  refresh={refetch}
                  totalPages={data.totalPages}
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

export default Salons;
