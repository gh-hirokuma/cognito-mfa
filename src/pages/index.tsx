import type { NextPage } from "next";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  useAuthenticator,
  Button,
} from "@aws-amplify/ui-react";
import Link from "next/link";
import { Box, Stack } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <Box p={12}>
      <Stack align={`start`}>
        <Button size={`small`} onClick={signOut}>
          サインアウト
        </Button>
        {user && <Link href={`/auth/mfa`}>MFA</Link>}
      </Stack>
    </Box>
  );
};

export default withAuthenticator(Home);
