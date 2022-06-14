import {
  Badge,
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import dayjs from 'dayjs';
import { Search, Show } from '../../../../../components/icons';
import { Paginator } from '../../../../../components/ui';

const BookingsTable = (props) => {
  const { bookings, totalPages, onParamsChange } = props;
  const [params, setParams] = useState({});

  const _onChangeParams = (value) => {
    setParams({
      ...params,
      ...value,
    });
  };

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

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
          <Box>
            <InputGroup>
              <Input
                focusBorderColor='inherit'
                rounded='none'
                placeholder='Tìm kiếm'
                w='sm'
                onChange={(e) => _onChangeParams({ search: e.target.value })}
              />
              <InputRightElement children={<Search width='20' height='20' />} />
            </InputGroup>
          </Box>
        </HStack>
        <Box>
          <Select
            rounded='none'
            defaultValue='new'
            onChange={(e) => _onChangeParams({ status: e.target.value })}
          >
            <option value='confirmed'>Đã xác nhận</option>
            <option value='completed'>Đã hoàn thành</option>
            <option value='cancel'>Đã hủy</option>
            <option value='new'>Gần đây</option>
          </Select>
        </Box>
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
        <Paginator
          totalPages={totalPages}
          onPageChange={(page) => setParams({ ...params, page })}
        />
      </HStack>
    </Box>
  );
};

export default BookingsTable;
