import { Box } from "@chakra-ui/react";
import Head from "next/head";

import Profile from "@/components/pages/Profile";

export default function ProfilePage() {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Profil</title>
        <meta content="ProtoSurvey" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Profile />
    </Box>
  );
}
