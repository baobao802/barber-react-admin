import {
  Avatar,
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout, selectAuth } from '../../../modules/auth/services/authSlice';
import styles from './Header.module.css';
import { Bell } from '../../icons';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector(selectAuth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={styles.root}>
      <HStack as='nav' justifyContent='space-between' w='full' mx='5' gap='16'>
        <Link as={NavLink} to='/'>
          <Image src='/logo.svg' alt='Logo' h='10' w='auto' />
        </Link>

        <Box flex='1'></Box>

        <HStack spacing='5'>
          <Box h='7' w='7'>
            <Icon as={Bell} h='inherit' w='inherit' />
          </Box>
          <Box>
            <Menu>
              <MenuButton variant='ghost' rounded='none'>
                <Avatar name={data?.email} />
              </MenuButton>
              <MenuList rounded='none'>
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
