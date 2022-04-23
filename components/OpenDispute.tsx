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
  Textarea
} from "@chakra-ui/react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { createBlobFromObject, loadFile } from "../util/helper";
import { callSmartContractFunction, pushToIPFS } from "../util/tatum";
import Actions from "../artifacts/contracts/Actions.sol/Actions.json";
import { AuthContext } from "../contexts/AuthContext";
import { ethers } from "ethers";
import { toast } from "react-toastify";

const STAKE_AMOUNT = "0.1";
function OpenDispute() {
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
      toast.success('Dispute created successfully');
    } catch(err) {
      toast.error('Error creating dispute');
    }
    console.log('Submit Claim');
    // const textCid = await pushToIPFS(
    //   await createBlobFromObject({
    //     title: values.title,
    //     description: values.description,
    //     requirements: values.requirements,
    //   })
    // );
    // const imageCid = await pushToIPFS(await loadFile(image as string));
    // callSmartContractFunction(
    //   "createAction",
    //   createABI,
    //   //Actions.abi,
    //   [
    //     (date.getTime() / 1000).toString(),
    //     ethers.utils.parseEther(STAKE_AMOUNT).toString(),
    //     imageCid,
    //     textCid,
    //   ],
    //   values.prizePoolSize,
    //   (currentUser.currentUser as any).privateKey
    // );
  };
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px"  variant='ghost' onClick={onOpen}>Open Dispute</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Open Dispute</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                description: "",
                image: "",
              }}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="description" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.description && form.touched.description}
                      >
                        <FormLabel htmlFor="description">Dispute Description</FormLabel>
                        <Textarea {...field} id="description" placeholder="Description" />
                        <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px" />
                  <Field name="image">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.image && form.touched.image}
                      >
                        <FormLabel htmlFor="image">Image Proof</FormLabel>
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
                  <Box mt="32px" mb="24px" textAlign="right">
                    <Button
                      type="submit"
                      colorScheme="green"
                      mr={3}
                      isLoading={props.isSubmitting}
                    >
                      Open Dispute
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
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

export default OpenDispute;
