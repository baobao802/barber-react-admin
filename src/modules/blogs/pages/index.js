import { Container, Link, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Page } from '../../../components/common';

const Blogs = (props) => {
  return (
    <Page title='List blogs'>
      <section>
        <Container maxW='container.xl'>
          <List>
            <ListItem>
              <Link as={ReactLink} to='/blogs/1'>
                Blog 1
              </Link>
            </ListItem>
            <ListItem>
              <Link as={ReactLink} to='/blogs/2'>
                Blog 2
              </Link>
            </ListItem>
            <ListItem>
              <Link as={ReactLink} to='/blogs/3'>
                Blog 3
              </Link>
            </ListItem>
          </List>
        </Container>
      </section>
    </Page>
  );
};

export default Blogs;
