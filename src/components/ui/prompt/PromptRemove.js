import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closePrompt, selectPromptState } from '../../../services/appSlice';

const PromptRemove = () => {
  const { isShowedPrompt, title, description } = useSelector(selectPromptState);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: isShowedPrompt,
  });
  const cancelRef = useRef();
  const dispatch = useDispatch();

  const _onClose = () => {
    onClose();
    dispatch(closePrompt());
  };

  const _onRemove = () => {
    onClose();
    dispatch(closePrompt(true));
  };

  useEffect(() => {
    if (isShowedPrompt) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowedPrompt]);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={_onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text dangerouslySetInnerHTML={{ __html: description }}></Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={_onClose}>
              Thoát
            </Button>
            <Button colorScheme='red' onClick={_onRemove} ml={3}>
              Đồng ý
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default PromptRemove;
