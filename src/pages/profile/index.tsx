import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Profile from "@/src/components/pages/Profile/Home";

const ProfilePage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Profil</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <Profile />
      </PageBase>
    </Box>
  );
};

export default ProfilePage;
