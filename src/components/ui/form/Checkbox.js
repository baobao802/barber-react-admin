import {
  FormControl,
  FormErrorMessage,
  Checkbox as ChakraCheckbox,
} from '@chakra-ui/react';
import React from 'react';

const Checkbox = ({
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
      <ChakraCheckbox
        id={name}
        colorScheme='teal'
        {...register(name, { ...validation })}
        css={`
          > span:first-of-type {
            box-shadow: unset;
          }
        `}
        {...rest}
      >
        {label}
      </ChakraCheckbox>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Checkbox;
