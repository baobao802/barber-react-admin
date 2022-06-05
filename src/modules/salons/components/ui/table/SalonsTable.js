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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';
import { Pencil, Trash } from '../../../../../components/icons';
import { usePrompt } from '../../../../../hooks';
import { useDeleteSalonByIdMutation } from '../../../services/salonsApi';

const SalonsTable = (props) => {
  const { salons, refresh } = props;
  const location = useLocation();
  const prompt = usePrompt();
  const toast = useToast();
  const [deleteSalonById, { isSuccess: isDeleted }] =
    useDeleteSalonByIdMutation();
  const [deleteAble, setDeleteAble] = useState(null);

  const _onRemove = (salonName, salonId) => {
    prompt({
      title: 'Xóa tài khoản!',
      description: `Bạn có chắc chắn muốn xóa salon <strong>${salonName}</strong>?`,
      callback: () => {
        setDeleteAble(salonId);
      },
    });
  };

  useEffect(() => {
    if (isDeleted) {
      toast({
        title: 'Xóa thành công!',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
      setDeleteAble(null);
      refresh && refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  useEffect(() => {
    if (deleteAble) {
      deleteSalonById(deleteAble);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAble]);

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
              <Th>Họ và tên</Th>
              <Th>Email</Th>
              <Th>Số điện thoại</Th>
              <Th>Trạng thái</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {salons.map(({ id, salonName, email, phone, isActive }, index) => (
              <Tr
                key={id}
                fontSize='sm'
                _hover={{
                  bgColor: 'gray.100',
                }}
              >
                <Td>{index + 1}</Td>
                <Td fontWeight='bold'>{salonName}</Td>
                <Td>{email}</Td>
                <Td>{phone}</Td>
                <Td>
                  {isActive ? (
                    <Badge colorScheme='green'>Hoạt động</Badge>
                  ) : (
                    <Badge colorScheme='red'>Khóa</Badge>
                  )}
                </Td>
                <Td>
                  <HStack>
                    <IconButton
                      as={ReactLink}
                      to={`/salons/${id}`}
                      state={{ backgroundLocation: location }}
                      aria-label='Edit user'
                      colorScheme='yellow'
                      icon={<Pencil width='20' height='20' />}
                      size='sm'
                      borderRadius='none'
                    />
                    <IconButton
                      aria-label='Remove user'
                      colorScheme='orange'
                      icon={<Trash width='20' height='20' />}
                      size='sm'
                      borderRadius='none'
                      onClick={() => _onRemove(salonName, id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack justifyContent='flex-end' py='4'>
        {/* <Paginator totalPages={totalPages} /> */}
      </HStack>
    </Box>
  );
};

export default SalonsTable;
