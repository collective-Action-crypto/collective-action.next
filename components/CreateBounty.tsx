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
  useColorModePreference,
  Text,
  Box,
} from "@chakra-ui/react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { createBlobFromObject, loadFile } from "../util/helper";
import { callSmartContractFunction, pushToIPFS } from "../util/tatum";
import { AuthContext } from "../contexts/AuthContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const STAKE_AMOUNT = "0.1";
function CreateBounty() {
  const currentUser = useContext(AuthContext);
  console.log("fnr", process.env.STAKE_AMOUNT);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFile = useRef(null as HTMLInputElement | null);
  const [image, setImage] = useState(undefined as string | undefined);
  const [date, setDate] = useState(new Date());

  function validateName(value) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }
  const createABI = {
    inputs: [
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
      {
        internalType: "string",
        name: "_metadata",
        type: "string",
      },
    ],
    name: "createAction",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  };
  const handleSubmit = async (values) => {
    try {
      const textCid = await pushToIPFS(
        await createBlobFromObject({
          title: values.title,
          description: values.description,
          requirements: values.requirements,
        })
      );
    const imageCid = await pushToIPFS(await loadFile(image as string));
    await callSmartContractFunction(
      "createAction",
      createABI,
      //Actions.abi,
      [
        (date.getTime() / 1000).toString(),
        ethers.utils.parseEther(STAKE_AMOUNT).toString(),
        imageCid,
        textCid,
      ],
      values.prizePoolSize,
      (currentUser.currentUser as any).privateKey
    );
    toast.success('Dispute created successfully');
    onClose();

    } catch(err) {
      toast.error('Error creating dispute');
    }
  };
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <Button
        borderRadius="16px"
        mr="24px"
        fontSize="14px"
        lineHeight="17px"
        width="110px"
        variant="ghost"
        textAlign="center"
        onClick={onOpen}
      >
        Create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Bounty</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: "",
                description: "",
                image: "",
                cutOffDate: "",
                requirements: "",
                prizePoolSize: "",
              }}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="title" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input {...field} id="title" placeholder="Name" />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Field name="description" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Description"
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel htmlFor="image">Image</FormLabel>
                        <Input
                          {...field}
                          type="file"
                          id="image"
                          ref={inputFile}
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={onImageChange}
                        />
                        {/*<Input {...field} id="image" placeholder="Image" />*/}
                        <Button
                          onClick={
                            inputFile.current
                              ? (e) =>
                                  (
                                    inputFile.current as HTMLInputElement
                                  ).click()
                              : () => {}
                          }
                        >
                          Upload
                        </Button>
                        <Box mt="18px" />
                        <img id="target" src={image} />
                        <FormErrorMessage>{form.errors.image}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Field name="cutOffDate">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.cutOffDate && form.touched.cutOffDate
                        }
                      >
                        <Box display="flex">
                          <Box>
                            <FormLabel htmlFor="cutOffDate">
                              Cut Off Date:{" "}
                            </FormLabel>
                          </Box>
                          <Box>
                            <Datepicker
                              selected={date}
                              onChange={(date: Date) => setDate(date)}
                              showTimeSelect
                              dateFormat="Pp"
                            />
                          </Box>
                        </Box>
                        <FormErrorMessage>
                          {form.errors.cutOffDate}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Field name="requirements" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.requirements && form.touched.requirements
                        }
                      >
                        <FormLabel htmlFor="requirements">
                          Requirements
                        </FormLabel>
                        <Input
                          {...field}
                          id="requirements"
                          placeholder="Requirements"
                        />
                        <FormErrorMessage>
                          {form.errors.requirements}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Field name="prizePoolSize" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.prizePoolSize &&
                          form.touched.prizePoolSize
                        }
                      >
                        <FormLabel htmlFor="prizePoolSize">Pool size</FormLabel>
                        <Input
                          {...field}
                          id="prizePoolSize"
                          placeholder="Pool Size"
                        />
                        <FormErrorMessage>
                          {form.errors.prizePoolSize}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px"></Box>

                  <Box mt="32px" mb="24px" textAlign="right">
                    <Button
                      type="submit"
                      colorScheme="green"
                      mr={3}
                      isLoading={props.isSubmitting}
                    >
                      Create Bounty
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </Box>
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
