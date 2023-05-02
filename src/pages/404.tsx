import Head from "next/head";
import { Box } from "@chakra-ui/react";

import PageBase from "../components/layouts/PageBase";
import PageNotFound from "../components/pages/Error/PageNotFound";

const SurveyPage = () => {
  return (
    <Box>
      <Head>
        <title>ProtoSurvey - Page Not Found</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageBase>
        <PageNotFound />
      </PageBase>
    </Box>
  );
};

export default SurveyPage;
