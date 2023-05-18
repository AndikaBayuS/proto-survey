import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "../components/layouts/PageBase";
import PageNotFound from "../components/pages/Error/PageNotFound";

const SurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Page Not Found</title>
        <meta content="ProtoSurvey" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <PageBase>
        <PageNotFound />
      </PageBase>
    </Box>
  );
};

export default SurveyPage;
