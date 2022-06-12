import {
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Close, Plus } from '../../../../../components/icons';
import { formatCurrency } from '../../../../../utils/transform';
import {
  useCreateSalonServicesMutation,
  useGetSalonServiceOptionsQuery,
  useRemoveSalonServiceByIdMutation,
} from '../../../services/salonServicesApi';

const ServicesTable = (props) => {
  const [services, setServices] = useState(props.services || []);
  const [serviceNameInput, setServiceNameInput] = useState('');
  const [servicePriceInput, setServicePriceInput] = useState('');
  const [addSalonServices] = useCreateSalonServicesMutation();
  const [removeSalonServiceById] = useRemoveSalonServiceByIdMutation();
  const { data: salonServiceOptions } = useGetSalonServiceOptionsQuery();

  const _onRemoveService = (index) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
    removeSalonServiceById(services[index].id);
  };

  const _onAddService = () => {
    if (serviceNameInput && servicePriceInput) {
      const service = {
        serviceName: serviceNameInput,
        servicePrice: servicePriceInput,
      };
      setServices((prevServices) => [...prevServices, service]);
      setServiceNameInput('');
      setServicePriceInput('');
      addSalonServices([
        {
          service: salonServiceOptions?.find(
            ({ name }) => name === serviceNameInput,
          ).id,
          price: {
            amount: parseInt(servicePriceInput, 10),
            currency: 'VND',
          },
        },
      ]);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(props.services)) {
      setServices(props.services);
    }
  }, [props.services]);

  return (
    <TableContainer w='full' bgColor='white' p='3'>
      <form>
        <Table variant='simple'>
          <Thead borderBottom='1px' borderColor='gray.100'>
            <Tr>
              <Th w='20'>#</Th>
              <Th w='48'>Dịch vụ</Th>
              <Th w='28'>Giá (VND)</Th>
              <Th w='20'></Th>
            </Tr>
          </Thead>
          <Tbody>
            {services.map(({ serviceName, servicePrice }, index) => (
              <Tr
                key={serviceName}
                fontSize='sm'
                _hover={{
                  bgColor: 'gray.100',
                }}
              >
                <Td w='20'>{index + 1}</Td>
                <Td w='48' fontWeight='bold'>
                  {serviceName}
                </Td>
                <Td w='28'>{formatCurrency(servicePrice)}</Td>
                <Td w='20'>
                  {props.isEditable && (
                    <IconButton
                      aria-label='Remove user'
                      colorScheme='orange'
                      icon={<Close width='20' height='20' />}
                      size='sm'
                      borderRadius='none'
                      onClick={() => _onRemoveService(index)}
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
          {props.isEditable && (
            <Tfoot>
              <Tr>
                <Th></Th>
                <Th>
                  <Select
                    type='text'
                    variant='flushed'
                    name='servicePrice'
                    placeholder='Dịch vụ'
                    value={serviceNameInput}
                    onChange={(e) => setServiceNameInput(e.target.value)}
                  >
                    {salonServiceOptions?.map(({ id, name }) => (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </Th>
                <Th>
                  <Input
                    type='number'
                    variant='flushed'
                    name='servicePrice'
                    placeholder='Giá dịch vụ'
                    value={servicePriceInput}
                    onChange={(e) => setServicePriceInput(e.target.value)}
                  />
                </Th>
                <Th>
                  <IconButton
                    aria-label='Remove service'
                    colorScheme='facebook'
                    icon={<Plus width='20' height='20' />}
                    size='sm'
                    borderRadius='none'
                    onClick={() => _onAddService()}
                  />
                </Th>
              </Tr>
            </Tfoot>
          )}
        </Table>
      </form>
    </TableContainer>
  );
};

export default ServicesTable;
