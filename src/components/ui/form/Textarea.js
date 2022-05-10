import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextarea,
} from '@chakra-ui/react';
import React from 'react';

const Textarea = ({
  register,
  name,
  validation,
  errors,
  label,
  fieldClassName,
  ...rest
}) => {
  const error = errors[name];
  return (
    <FormControl isInvalid={error} className={fieldClassName}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraTextarea
        id={name}
        {...register(name, { ...validation })}
        focusBorderColor='inherit'
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Textarea;
