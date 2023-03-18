import Head from "next/head";
import { Box } from "@chakra-ui/react";

import CreateSurvey from "@/src/components/pages/Survey/CreateSurvey";

const CreateSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Buat Survei</title>
      </Head>
      <CreateSurvey />
    </Box>
  );
};

export default CreateSurveyPage;
