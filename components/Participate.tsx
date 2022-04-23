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
const STAKE_AMOUNT = "0.1";
function Participate() {
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
    console.log('Submit Claim')
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
      <Button fontWeight="500" fontSize="14px" lineHeight="17px" borderRadius="16px" colorScheme='green' mr={3} onClick={onOpen}>
        Participate in Bounty
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Participate in Bounty</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                amount: "",
              }}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="amount" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.amount && form.touched.amount}
                      >
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <Input {...field} id="amount" placeholder="Amount" />
                        <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box mt="12px" />
                  <Box mt="32px" mb="24px" textAlign="right">
                    <Button
                      type="submit"
                      colorScheme="green"
                      mr={3}
                      isLoading={props.isSubmitting}
                    >
                      Pay
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Participate;
