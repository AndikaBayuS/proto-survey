import { Box } from "@chakra-ui/react";
import Head from "next/head";

import CreateSurvey from "@/components/pages/Survey/CreateSurvey";

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
