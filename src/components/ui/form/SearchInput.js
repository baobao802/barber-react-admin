import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Search } from '../../icons';

const SearchInput = ({
  register,
  name,
  errors,
  label,
  fieldClassName,
  onOpenModalSearch,
  required,
  ...rest
}) => {
  const error = errors[name];
  return (
    <FormControl isInvalid={error} className={fieldClassName}>
      {label && (
        <FormLabel htmlFor={name}>
          {label}{' '}
          {required && (
            <Text as='span' color='red'>
              *
            </Text>
          )}
        </FormLabel>
      )}
      <InputGroup onClick={onOpenModalSearch}>
        <ChakraInput
          id={name}
          {...register(name)}
          focusBorderColor='inherit'
          rounded='none'
          _invalid={{
            border: '2px solid #e53e3e',
          }}
          {...rest}
        />
        <InputRightElement children={<Search width='20' height='20' />} />
      </InputGroup>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default SearchInput;
