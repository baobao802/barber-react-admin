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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Lock, Pencil, Search } from '../../../../../components/icons';
import { Paginator } from '../../../../../components/ui';
import { usePrompt } from '../../../../../hooks';
import { useDeleteCustomerByIdMutation } from '../../../services/customersApi';

const CustomersTable = (props) => {
  const { customers, refresh, totalPages, onParamsChange } = props;
  const prompt = usePrompt();
  const toast = useToast();
  const [deleteCustomerById, { isSuccess: isDeleted }] =
    useDeleteCustomerByIdMutation();
  const [deleteAble, setDeleteAble] = useState(null);
  const [params, setParams] = useState({});

  const _onRemove = (email, customerId) => {
    prompt({
      title: 'Xóa tài khoản!',
      description: `Bạn có chắc chắn muốn xóa tài khoản <strong>${email}</strong>?`,
      callback: () => {
        setDeleteAble(customerId);
      },
    });
  };

  const _onChangeParams = (value) => {
    setParams({
      ...params,
      ...value,
    });
    console.log({
      ...params,
      ...value,
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
      deleteCustomerById(deleteAble);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAble]);

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
        px='4'
        py='10'
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
            defaultValue='active'
            onChange={(e) => _onChangeParams({ status: e.target.value })}
          >
            <option value='active'>Hoạt động</option>
            <option value='looked'>Khóa</option>
          </Select>
        </Box>
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
            {customers.map(
              ({ id, firstname, lastname, email, phone, isActive }, index) => (
                <Tr
                  key={id}
                  fontSize='sm'
                  _hover={{
                    bgColor: 'gray.100',
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td fontWeight='bold'>
                    {firstname} {lastname}
                  </Td>
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
                        to={`/customers/${id}`}
                        aria-label='Edit user'
                        colorScheme='yellow'
                        icon={<Pencil width='20' height='20' />}
                        size='sm'
                        borderRadius='none'
                      />
                      <IconButton
                        aria-label='Remove user'
                        colorScheme='orange'
                        icon={<Lock width='20' height='20' />}
                        size='sm'
                        borderRadius='none'
                        onClick={() => _onRemove(email, id)}
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

export default CustomersTable;
