import { Box } from '@chakra-ui/react';
import React from 'react';

const Step = (props) => {
  return (
    <Box
      w='full'
      display='inline-flex'
      justifyContent='center'
      alignItems='center'
    >
      {props.children}
    </Box>
  );
};

export default Step;
