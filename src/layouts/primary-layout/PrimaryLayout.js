import { Box, HStack } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '../../components/common';
import styles from './PrimaryLayout.module.css';

const PrimaryLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className={styles.main}>
        <HStack spacing='4' alignItems='flex-start' p='4'>
          <Sidebar />
          <Box flex='1' overflowX='hidden'>
            <Outlet />
          </Box>
        </HStack>
      </main>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default PrimaryLayout;
