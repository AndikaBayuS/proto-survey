import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "@/src/components/layouts/PageBase";
import EditSurvey from "@/src/components/pages/Survey/EditSurvey";

const EditSurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Edit Survei</title>
      </Head>
      <PageBase>
        <EditSurvey />
      </PageBase>
    </Box>
  );
};

export default EditSurveyPage;
