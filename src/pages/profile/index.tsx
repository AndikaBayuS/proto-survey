import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import Profile from "@/src/components/pages/Profile/Home";
import { ProfileProps } from "@/src/global/interfaces";
import { getUserData, getUserId } from "@/src/utils/prisma/user";

const ProfilePage = ({ userData }: ProfileProps) => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Peringkat</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <Profile userData={userData} />
      </PageBase>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = await getUserId(String(session?.user?.email));
  const userData = await getUserData(String(userId));
  const data = JSON.parse(JSON.stringify(userData));

  return {
    props: {
      userData: data,
    },
  };
};

export default ProfilePage;
