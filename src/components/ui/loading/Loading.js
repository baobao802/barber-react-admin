import { Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor='transparent' textAlign='center' boxShadow='none'>
        <div>
          <Spinner thickness='4px' speed='0.65s' color='blue.500' size='xl' />
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Loading;
