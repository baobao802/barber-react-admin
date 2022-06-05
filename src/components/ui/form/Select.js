import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useController } from 'react-hook-form';
import ReactSelect from 'react-select';

const styleConfig = {
  control: (styles) => ({
    ...styles,
    borderRadius: 'none',
    borderColor: '#e2e8f0',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: '#cbd5e0',
    },
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: 'none',
    borderColor: '#e2e8f0',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0 16px',
    height: '40px',
  }),
};

const Select = ({
  register,
  name,
  errors,
  control,
  required,
  label,
  fieldClassName,
  options,
  ...rest
}) => {
  const { field } = useController({ name, control });
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
      <ReactSelect
        id={name}
        options={options}
        {...field}
        styles={styleConfig}
        isDisabled={rest.disabled}
        {...rest}
      />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Select;
