import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import ResponseSurvey from "@/src/components/pages/Survey/ResponseSurvey";

const ResponseSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Respon</title>
      </Head>
      <PageBase>
        <ResponseSurvey />
      </PageBase>
    </Box>
  );
};

export default ResponseSurveyPage;
