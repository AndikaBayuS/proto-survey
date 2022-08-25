import Card from "@/src/components/Card/Card";
import BaseLayout from "@/src/layouts/BaseLayout/BaseLayout";
import { prisma } from "@/src/common/prisma";
import { Surveys, User } from "@prisma/client";
import type { GetStaticProps } from "next";
import Head from "next/head";

type Props = {
  surveys: Surveys[];
  owners: User[];
};

export const getStaticProps: GetStaticProps = async () => {
  const surveyData = await prisma.surveys.findMany();
  const surveys = JSON.parse(JSON.stringify(surveyData));

  const ownerData = await prisma.user.findMany({
    where: {
      id: surveys.owner,
    },
  });
  const owners = JSON.parse(JSON.stringify(ownerData));

  return {
    props: {
      surveys,
      owners,
    },
  };
};

const Home: React.FC<Props> = ({ surveys, owners }) => {
  return (
    <div>
      <Head>
        <title>ProtoSurvey</title>
        <meta name="description" content="ProtoSurvey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseLayout>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3">
            {surveys.map((survey) => {
              let owner = owners.find((data: User) => data.id === survey.owner);
              return (
                <Card
                  key={survey.id}
                  owner={owner!.name}
                  title={survey.name}
                  description={survey.description}
                />
              );
            })}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Home;
