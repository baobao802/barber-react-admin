import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageModal = (props) => {
  const size = useBreakpointValue({
    xs: 'xs',
    sm: 'lg',
    md: '2xl',
    lg: '5xl',
    xl: '5xl',
    '2xl': '6xl',
  });
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <Modal isOpen size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title || 'Modal Page'}</ModalHeader>
        {/* <ModalCloseButton onClick={goBack} /> */}
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button variant='outline' colorScheme='blue' mr={3} onClick={goBack}>
            {props.closeBtnTitle || 'Close'}
          </Button>
          <Button colorScheme='blue' mr={3}>
            {props.submitBtnTitle || 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PageModal;
