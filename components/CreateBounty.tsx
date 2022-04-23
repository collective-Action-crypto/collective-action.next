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
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createBlobFromObject, loadFile } from "../util/helper";
import { pushToIPFS } from "../util/tatum";

function CreateBounty() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const inputFile = useRef(null as HTMLInputElement | null);
  const [image, setImage] = useState(undefined as string | undefined);
  const [cutOffDate, setCutOffDate] = useState(undefined);
  const [requirements, setRequirements] = useState(undefined);

  const handleSubmit = async (e) => {
    console.log("event", e);
    /*console.log(`title: ${title}`);
    console.log(`description: ${description}`);
    console.log(`image: ${image}`);
    console.log(`cutOffDate: ${cutOffDate}`);
    console.log(`requirements: ${requirements}`);
    const textCid = await pushToIPFS(
      await createBlobFromObject({
        title: title,
        description: description,
        requirements: requirements,
      })
    );
    const imageCid = await pushToIPFS(await loadFile(image as string));
    console.log("cid", textCid);
    console.log("cid2", imageCid);*/
  };
  console.log("rguncdk", inputFile.current);
  return (
    <>
      <Button onClick={onOpen}>Create</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create Bounty</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e?.target?.value)}
                />

                <FormLabel htmlFor="title">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e?.target?.value)}
                />

                <FormLabel htmlFor="title">Image</FormLabel>
                {/*<Input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e?.target?.value)}
              />*/}
                <Input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <Button
                  onClick={
                    inputFile.current
                      ? (e) => (inputFile.current as HTMLInputElement).click()
                      : () => {}
                  }
                >
                  Create
                </Button>
                <FormLabel htmlFor="title">Cut off date</FormLabel>
                <Input
                  id="cutOffDate"
                  type="text"
                  value={cutOffDate}
                  onChange={(e) => setCutOffDate(e?.target?.value)}
                />

                <FormLabel htmlFor="title">Requirements</FormLabel>
                <Input
                  id="requirements"
                  type="text"
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
              <Input type="submit" colorScheme="green" mr={3}>
                Create
              </Input>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateBounty;
