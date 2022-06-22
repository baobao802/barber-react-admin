import { Avatar, Box, HStack, Icon, Image, Link } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectAuth } from '../../../modules/auth/services/authSlice';
import { Bell } from '../../icons';
import styles from './Header.module.css';

const Header = () => {
  const { data } = useSelector(selectAuth);

  return (
    <header className={styles.root}>
      <HStack as='nav' justifyContent='space-between' w='full' mx='5' gap='16'>
        <Link as={NavLink} to='/'>
          <Image src='/logo.svg' alt='Logo' h='10' w='auto' />
        </Link>

        <Box flex='1'></Box>

        <HStack spacing='5'>
          <Box h='7' w='7'>
            <Link as={NavLink} to='/notifications' display='inline-block'>
              <Icon as={Bell} h='inherit' w='inherit' />
            </Link>
          </Box>
          <Box>
            <Avatar name={data?.email} />
          </Box>
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
