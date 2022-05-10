import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const Input = ({
  register,
  name,
  errors,
  required,
  label,
  fieldClassName,
  ...rest
}) => {
  const error = errors[name];
  return (
    <FormControl isInvalid={error}>
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
      <ChakraInput
        id={name}
        {...register(name)}
        focusBorderColor='inherit'
        rounded='none'
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
