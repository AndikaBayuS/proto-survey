import BaseLayout from "@/layouts/BaseLayout/BaseLayout";
import { PrismaClient, Questions } from "@prisma/client";
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
  const prisma = new PrismaClient();
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
