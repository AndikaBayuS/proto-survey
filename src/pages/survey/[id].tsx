import BaseLayout from "@/src/layouts/BaseLayout/BaseLayout";
import { prisma } from "@/src/common/prisma";
import { Questions } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  questions: Questions[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "cuid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const questionId: any = params?.id;
  const questionData = await prisma.questions.findMany({
    where: {
      surveyId: questionId,
    },
  });

  console.log(questionData);
  return {
    props: {
      questions: questionData,
    },
  };
};

const Survey: React.FC<Props> = ({ questions }) => {
  return (
    <BaseLayout>
      {questions?.map((question) => (
        <div key={question.id}>
          <p>{question.question}</p>
        </div>
      ))}
    </BaseLayout>
  );
};

export default Survey;
