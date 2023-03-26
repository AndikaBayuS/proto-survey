import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import CreateSurvey from "@/src/components/pages/Survey/CreateSurvey";

const CreateSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Buat Survei</title>
      </Head>
      <PageBase>
        <CreateSurvey />
      </PageBase>
    </Box>
  );
};

export default CreateSurveyPage;
