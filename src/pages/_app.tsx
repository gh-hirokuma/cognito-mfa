import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Amplify } from "aws-amplify";
import { ChakraProvider } from "@chakra-ui/react";
import awsExports from "../aws-exports";

Amplify.configure(awsExports);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
