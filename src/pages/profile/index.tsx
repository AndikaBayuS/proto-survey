import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Profile from "@/src/components/pages/Profile/Home";

const ProfilePage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Profil</title>
        <meta content="ProtoSurvey" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <PageBase>
        <Profile />
      </PageBase>
    </Box>
  );
};

export default ProfilePage;
