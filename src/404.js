import { Button, Container, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Heading as='h2'>Page Not Found!</Heading>
      <Button onClick={() => navigate(-1, { replace: true })}>Go back</Button>
    </Container>
  );
};

export default NotFound;
