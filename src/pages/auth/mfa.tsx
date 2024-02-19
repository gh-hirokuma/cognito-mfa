import type { NextPage } from "next";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import QRCodeCanvas from "qrcode.react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  code: string;
};

const Home: NextPage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [mfaURL, setMfaURL] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  function onSubmit(values: FormData) {
    const { code } = values;

    Auth.verifyTotpToken(user, code).then(() => {
      Auth.setPreferredMFA(user, "TOTP");
    });
  }

  console.log(mfaURL);
  console.log(code);
  console.log(user);

  const setupTOTP = () => {
    Auth.setupTOTP(user).then((code) => {
      console.log(code);
      setCode(code);

      setMfaURL(
        "otpauth://totp/AWSCognito:" +
          user.username +
          "?secret=" +
          code +
          "&issuer=a_organization"
      );
    });
  };

  const setPreferredMFA = () => {
    Auth.setPreferredMFA(user, "TOTP");
  };

  const verifyTOTP = () => {};

  return (
    <Stack p={12} align={`start`} spacing={4}>
      <Heading>MFA</Heading>
      <Button onClick={setupTOTP}>Setup MFA</Button>
      {mfaURL && <QRCodeCanvas value={mfaURL} />}
      <Button onClick={verifyTOTP}>Verify MFA</Button>
      <Stack as={`form`} onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.code}>
          <FormLabel htmlFor="name">code</FormLabel>
          <Input
            id="code"
            placeholder="code"
            {...register("code", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default withAuthenticator(Home);
