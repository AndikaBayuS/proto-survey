import {
  Box,
  Divider,
  HStack,
  SimpleGrid,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";

import SearchField from "@/components/forms/SearchField";
import Loading from "@/components/fragments/Loading";
import SurveyCard from "@/components/fragments/SurveyCard";
import fetcher from "@/lib/fetcher";
import { SURVEY_CATEGORY } from "@/utils/constants";

export default function Home() {
  const router = useRouter();
  const { search = "", category = "" } = router.query;
  const { data, error, isLoading } = useSWR(
    `/api/survey?search=${search}&category=${category}`,
    fetcher,
    {
      revalidateOnMount: true,
    }
  );

  const handleColorScheme = (value) => {
    if (value === category) {
      return "messenger";
    } else {
      return "blackAlpha";
    }
  };
  const handleSelectCategory = (category) => {
    if (category === "semua") {
      router.push({
        query: {
          search: search,
          category: "",
        },
      });
    } else {
      router.push({
        query: {
          search: search,
          category,
        },
      });
    }
  };
  const handleSearchSurvey = (search) => {
    router.push({
      query: {
        search,
        category: category,
      },
    });
  };

  if (search === "" && category === "") {
    if (isLoading) return <Loading />;
  }
  if (error) return <div>Error</div>;

  return (
    <Box>
      <SearchField
        defaultValue={search}
        onSubmit={(value) => handleSearchSurvey(value)}
      />
      <HStack alignItems="center">
        <Wrap mt={5} spacing={4}>
          <WrapItem>Kategori:</WrapItem>
          {SURVEY_CATEGORY.map((category, index) => (
            <WrapItem key={category.value}>
              <Tag
                colorScheme={handleColorScheme(category.value)}
                cursor="pointer"
                fontWeight="semibold"
                onClick={() => handleSelectCategory(category.value)}
              >
                {index === 0 ? "" : "#"} {category.label}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </HStack>
      <Divider borderColor="gray.400" my={5} />
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {data?.map((survey) => {
          const owner = survey.owner;
          return (
            <SurveyCard
              category={survey.category}
              description={survey.description}
              key={survey.id}
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
}
