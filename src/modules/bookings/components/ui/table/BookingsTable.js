import {
  Badge,
  Box,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Show } from '../../../../../components/icons';
// import { Paginator } from '../../../../../components/ui';

const BookingsTable = (props) => {
  const { bookings } = props;

  return (
    <Box>
      <HStack
        h='14'
        p='3'
        bgColor='white'
        borderBottom='1px'
        borderColor='gray.100'
      >
        <HStack flex='1'>
          <Box>Searchbar</Box>
        </HStack>
        <Box>Filter</Box>
      </HStack>
      <TableContainer bgColor='white' p='3'>
        <Table variant='simple'>
          <Thead borderBottom='1px' borderColor='gray.100'>
            <Tr>
              <Th>#</Th>
              <Th>Khách hàng</Th>
              <Th>Số điện thoại</Th>
              <Th>Thời gian</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map(
              ({ id, customerName, phone, status, updatedAt }, index) => (
                <Tr
                  key={id}
                  fontSize='sm'
                  _hover={{
                    bgColor: 'gray.100',
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td fontWeight='bold'>{customerName}</Td>
                  <Td>{phone}</Td>
                  <Td>{dayjs(updatedAt).format('HH:mm, DD-MM-YYYY')}</Td>
                  <Td>
                    <Badge colorScheme='green'>{status}</Badge>
                  </Td>
                  <Td>
                    <HStack>
                      <IconButton
                        as={ReactLink}
                        to={`/bookings/${id}`}
                        aria-label='booking details'
                        colorScheme='yellow'
                        icon={<Show width='20' height='20' />}
                        size='sm'
                        borderRadius='none'
                      />
                    </HStack>
                  </Td>
                </Tr>
              ),
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent='flex-end' py='4'>
        {/* <Paginator totalPages={totalPages} /> */}
      </HStack>
    </Box>
  );
};

export default BookingsTable;
