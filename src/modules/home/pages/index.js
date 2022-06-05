import { Box, Container, Heading } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Page } from '../../../components/common';

const Home = () => {
  return (
    <Fragment>
      <Page title='Dashboard | Brand'>
        <section>
          <Container maxW='container.xl'>
            <Heading as='h2' fontSize='2xl' my='4'>
              Dashboard
            </Heading>
            <Box></Box>
          </Container>
        </section>
      </Page>
    </Fragment>
  );
};

export default Home;
