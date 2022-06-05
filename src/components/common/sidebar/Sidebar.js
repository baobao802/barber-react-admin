import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Icon,
  Link,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { Fragment } from 'react';
import {
  NavLink as ReactNavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styles from './Sidebar.module.css';
import { configs } from './configs';
import { activeAccordionItemIndex } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { rolesMapper } from '../../../modules/auth/utils/mappers';
import { logout, selectAuth } from '../../../modules/auth/services/authSlice';
import _ from 'lodash';
import { Logout } from '../../icons';

const Sidebar = () => {
  const location = useLocation();
  const { data } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!data) {
    return <Fragment></Fragment>;
  }

  const linkStyleActive = ({ isActive }) => {
    return isActive
      ? {}
      : {
          color: 'gray',
        };
  };

  return (
    <aside className={styles.root}>
      <VStack alignItems='flex-start' minH='xl' w='full' overflowY='auto'>
        <Accordion
          flex='1'
          w='full'
          defaultIndex={activeAccordionItemIndex(configs, location.pathname)}
          allowToggle
        >
          {configs.map(({ title, path, icon, roles, children }, i) => {
            if (_.size(_.difference(rolesMapper(data.user), roles)) !== 0)
              return <Fragment key={'pi-' + i}></Fragment>;

            if (path) {
              return (
                <AccordionItem key={'pi-' + i} border='none' mb='1'>
                  <AccordionButton
                    as={ReactNavLink}
                    to={path}
                    py='4'
                    rounded='lg'
                    _expanded={{
                      color: 'blue.500',
                      fontWeight: 'bold',
                      backgroundColor: 'white',
                    }}
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ backgroundColor: 'white', fontWeight: 'bold' }}
                  >
                    <Icon as={icon} w='5' h='5' mr='2' />
                    <Text textTransform='capitalize'>{title}</Text>
                  </AccordionButton>
                </AccordionItem>
              );
            }

            return (
              <AccordionItem key={'pi-' + i} border='none' mb='1'>
                <AccordionButton
                  py='4'
                  rounded='lg'
                  _expanded={{
                    color: 'blue.500',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                  }}
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ backgroundColor: 'white', fontWeight: 'bold' }}
                >
                  <Icon as={icon} w='5' h='5' mr='2' />
                  <Box flex='1' textAlign='left' textTransform='capitalize'>
                    {title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel as='nav' pl='8'>
                  <List>
                    {children?.map(({ title, path }, j) => (
                      <ListItem key={'ci-' + j} py='3'>
                        <Link
                          as={ReactNavLink}
                          to={path}
                          display='block'
                          fontWeight='bold'
                          textTransform='capitalize'
                          _hover={{ textDecor: 'none' }}
                          style={linkStyleActive}
                        >
                          {title}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Box>
          <Button onClick={logoutHandler} leftIcon={<Logout />} ml='5'>
            Logout
          </Button>
        </Box>
      </VStack>
    </aside>
  );
};

export default Sidebar;
