import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as ChakraSwitch,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const Switch = ({
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
      <ChakraSwitch
        id={name}
        {...register(name)}
        focusBorderColor='inherit'
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Switch;
