import { Box, Button, Container } from '@chakra-ui/react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../../../components/common';

const Blog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Page title='Blog details'>
      <section>
        <Container maxW='container.xl'>
          <Box>
            <Button onClick={goBack}>Go Back</Button>
          </Box>
          <Box>Blog {blogId}</Box>
        </Container>
      </section>
    </Page>
  );
};

export default Blog;
