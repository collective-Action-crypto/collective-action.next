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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { createBlobFromObject, loadFile } from "../util/helper";
import { pushToIPFS } from "../util/tatum";

function CreateBounty() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFile = useRef(null as HTMLInputElement | null);

  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    }
    return error
  }

  const handleSubmit = async (values) => {
    console.log(values);
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
  return (
    <>
      <Button onClick={onOpen}>Create</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Create Bounty</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

            <Formik
              initialValues={{ title: '', description: '', image: '', cutOffDate: '', requirements: '' }}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false)
              }}
            >
              {(props) => (
                <Form>
                  <Field name='title' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.title && form.touched.title}>
                        <FormLabel htmlFor='title'>Title</FormLabel>
                        <Input {...field} id='title' placeholder='Name' />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='description' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.description && form.touched.description}>
                        <FormLabel htmlFor='description'>Description</FormLabel>
                        <Input {...field} id='description' placeholder='Description' />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='image' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.image && form.touched.image}>
                        <FormLabel htmlFor='image'>Image</FormLabel>
                        <Input {...field} id='image' placeholder='Image' />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='cutOffDate' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.cutOffDate && form.touched.cutOffDate}>
                        <FormLabel htmlFor='cutOffDate'>Cut off date</FormLabel>
                        <Input {...field} id='cutOffDate' placeholder='Cut Off Date' />
                        <FormErrorMessage>{form.errors.cutOffDate}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='requirements' validate={validateName}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.requirements && form.touched.requirements}>
                        <FormLabel htmlFor='requirements'>Requirements</FormLabel>
                        <Input {...field} id='requirements' placeholder='Requirements' />
                        <FormErrorMessage>{form.errors.requirements}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                    <Button type="submit" colorScheme="green" mr={3} isLoading={props.isSubmitting} >
                      Create
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </Form>
                )}
            </Formik>
              {/* <FormControl>
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
              </FormControl> */}
            </ModalBody>

            {/* <ModalFooter>
              <Input type="submit" colorScheme="green" mr={3}>
                Create
              </Input>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateBounty;
