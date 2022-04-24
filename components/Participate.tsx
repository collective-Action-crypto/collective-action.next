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
  Textarea,
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

const STAKE_AMOUNT = "0.01";
const contribute_ABI = {
  inputs: [
    {
      internalType: "uint256",
      name: "actionId",
      type: "uint256",
    },
  ],
  name: "contribute",
  outputs: [],
  stateMutability: "payable",
  type: "function",
};
function Participate(props: { id: string }) {
  const { currentUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputFile = useRef(null as HTMLInputElement | null);
  const [image, setImage] = useState(undefined as string | undefined);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  function validateName(value) {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  }

  const submit = async (values) => {
    setLoading(true);
    try {
      await callSmartContractFunction(
        "contribute",
        contribute_ABI,
        [props.id],
        values.amount,
        (currentUser.currentUser as any).privateKey
      );
      onClose();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw Error('Error');
    }
  }

  const handleSubmit = async (values) => {
    toast.promise(() => submit(values), {
      pending: "Interacting with contract",
      success: "Success!",
      error: "Error",
    });
  };
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <>
      <Button
        fontWeight="500"
        fontSize="14px"
        lineHeight="17px"
        borderRadius="16px"
        colorScheme="green"
        mr={3}
        onClick={onOpen}
      >
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
                        <FormErrorMessage>
                          {form.errors.amount}
                        </FormErrorMessage>
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
                      disabled={loading}
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
