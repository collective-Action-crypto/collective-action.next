import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react';

function CreateBounty() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [cutOffDate, setCutOffDate] = useState(undefined);
  const [requirements, setRequirements] = useState(undefined);

  const handleSubmit = async (e) => {
    console.log(`title: ${title}`);
    console.log(`description: ${description}`);
    console.log(`image: ${image}`);
    console.log(`cutOffDate: ${cutOffDate}`);
    console.log(`requirements: ${requirements}`);
  }

  return (
    <>
      <Button onClick={onOpen}>Create</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Bounty</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor='title'>TItle</FormLabel>
              <Input
                id='title'
                type='text'
                value={title}
                onChange={(e) => setTitle(e?.target?.value)}
              />

              <FormLabel htmlFor='title'>Description</FormLabel>
              <Input
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e?.target?.value)}
              />

              <FormLabel htmlFor='title'>Image</FormLabel>
              <Input
                id='image'
                type='text'
                value={image}
                onChange={(e) => setImage(e?.target?.value)}
              />

              <FormLabel htmlFor='title'>Cut off date</FormLabel>
              <Input
                id='cutOffDate'
                type='text'
                value={cutOffDate}
                onChange={(e) => setCutOffDate(e?.target?.value)}
              />

              <FormLabel htmlFor='title'>Requirements</FormLabel>
              <Input
                id='requirements'
                type='text'
                value={requirements}
                onChange={(e) => setRequirements(e?.target?.value)}
              />
              
              {/* {!isError ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )} */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button variant='ghost'onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateBounty;