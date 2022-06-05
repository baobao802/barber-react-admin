import {
  Box,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
// import { Link as ReactLink, useSearchParams } from 'react-router-dom';
import { Page } from '../../../components/common';
import { Trash } from '../../../components/icons';

const Notifications = () => {
  // const [searchParams] = useSearchParams();
  // const page = parseInt(searchParams.get('p') || 1);
  // const { data, isError, isLoading } = useGetBookingsQuery(page);

  return (
    <Fragment>
      <Page title='Danh sách người dùng | Brand'>
        <section>
          <Box w='full'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Thông báo
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
            {/* <Box>
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
                <BookingsTable bookings={data.bookings} />
              ) : null}
            </Box> */}
            <VStack spacing='2'>
              <HStack bgColor='white' px='5' py='3' rounded='lg' spacing='3'>
                <Box>
                  <Heading as='h5' fontSize='lg' mb='2' fontWeight='medium'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Heading>
                  <Text color='gray'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laudantium quae architecto, accusamus, illo
                    corrupti adipisci voluptas impedit doloribus consequatur
                    autem. Eaque omnis voluptatibus rerum soluta amet. Id,
                    maiores et.
                  </Text>
                </Box>
                <IconButton
                  aria-label='remove notification'
                  colorScheme='yellow'
                  icon={<Trash width='20' height='20' />}
                  size='sm'
                />
              </HStack>
              <HStack bgColor='white' px='5' py='3' rounded='lg' spacing='3'>
                <Box>
                  <Heading as='h5' fontSize='lg' mb='2' fontWeight='medium'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Heading>
                  <Text color='gray'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatibus laudantium quae architecto, accusamus, illo
                    corrupti adipisci voluptas impedit doloribus consequatur
                    autem. Eaque omnis voluptatibus rerum soluta amet. Id,
                    maiores et.
                  </Text>
                </Box>
                <IconButton
                  aria-label='remove notification'
                  colorScheme='yellow'
                  icon={<Trash width='20' height='20' />}
                  size='sm'
                />
              </HStack>
            </VStack>
          </Box>
        </section>
      </Page>
    </Fragment>
  );
};

export default Notifications;
