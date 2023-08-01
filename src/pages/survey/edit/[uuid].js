import { Box } from "@chakra-ui/react";
import Head from "next/head";

import EditSurvey from "@/components/pages/Survey/EditSurvey";

export default function EditSurveyPage() {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Edit Survei</title>
      </Head>
      <EditSurvey />
    </Box>
  );
}
