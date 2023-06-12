import { useRouter } from "next/router";
import {
  Box,
  Divider,
  HStack,
  SimpleGrid,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import useSWR from "swr";

import Card from "@/src/components/common/Card";
import SearchField from "@/src/components/common/SearchField";
import Skeleton from "@/src/components/common/Skeleton";
import fetcher from "@/src/lib/fetcher";

import { SURVEY_CATEGORY } from "../CreateSurvey/constants";

interface Survey {
  id: string;
  title: string;
  description: string;
  surveyMode: string;
  category: string;
  subCategory: string[];
  owner: {
    name: string;
    image: string;
  };
}

const Home = () => {
  const router = useRouter();
  const { search = "", category = "" } = router.query;
  const { data, error, isLoading } = useSWR<Survey[]>(
    `/api/survey?search=${search}&category=${category}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const handleSelectCategory = (category: string) => {
    router.push({
      query: {
        search: search,
        category,
      },
    });
  };
  const handleSearchSurvey = (search: string) => {
    router.push({
      query: {
        search,
        category: category,
      },
    });
  };
  const handleColorScheme = (value: string) => {
    if (value === category) {
      return "messenger";
    } else {
      return "blackAlpha";
    }
  };

  if (search === "" && category === "") {
    if (isLoading) return <Skeleton />;
  }
  if (error) return <div>Error</div>;

  return (
    <Box>
      <SearchField
        defaultValue={search}
        onSubmit={(value: string) => handleSearchSurvey(value)}
      />
      <HStack alignItems="center">
        <Wrap mt={5} spacing={4}>
          <WrapItem>Kategori:</WrapItem>
          {SURVEY_CATEGORY.map((category) => (
            <WrapItem key={category.value}>
              <Tag
                colorScheme={handleColorScheme(category.value)}
                cursor="pointer"
                fontWeight="semibold"
                onClick={() => handleSelectCategory(category.value)}
              >
                # {category.label}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </HStack>
      <Divider borderColor="black" my={5} variant="dashed" />
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {data?.map((survey) => {
          const owner = survey.owner as Prisma.JsonObject;
          return (
            <Card
              key={survey.id}
              category={survey.category}
              description={survey.description}
              ownerImage={owner.image}
              ownerName={owner.name}
              subCategory={survey.subCategory}
              surveyId={survey.id}
              surveyMode={survey.surveyMode}
              title={survey.title}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
