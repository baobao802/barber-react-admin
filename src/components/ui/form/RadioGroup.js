import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  RadioGroup as ChakraRadioGroup,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const RadioGroup = ({
  register,
  name,
  errors,
  required,
  label,
  fieldClassName,
  children,
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
      <ChakraRadioGroup
        id={name}
        colorScheme='teal'
        {...register(name)}
        css={`
          > span:first-of-type {
            box-shadow: unset;
          }
        `}
        {...rest}
      >
        {children}
      </ChakraRadioGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default RadioGroup;
