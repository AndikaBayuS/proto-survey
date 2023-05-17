import { Badge, Box, HStack, Text } from "@chakra-ui/react";

import { SURVEY_CATEGORY } from "../../constants";

const CategoryField = ({ setFieldValue, surveyCategory }: any) => {
  const handleSelectedCategory = (value: any) => {
    const updatedCategories = [...surveyCategory, value];
    setFieldValue("surveyCategory", updatedCategories);
  };
  const handleRemoveCategory = (value: any) => {
    const updatedCategories = surveyCategory.filter(
      (item: any) => item !== value
    );
    setFieldValue("surveyCategory", updatedCategories);
  };

  return (
    <Box w={"full"}>
      <Text fontWeight={"semibold"}>Kategori</Text>
      <Box bgColor={"gray.100"} w={"full"} p={2} rounded={"md"}>
        {surveyCategory.length === 0 && (
          <Text color={"gray.500"}>Belum ada kategori yang dipilih</Text>
        )}
        {surveyCategory.map((item: any) => (
          <Badge
            key={item}
            colorScheme={"messenger"}
            cursor={"pointer"}
            rounded={"md"}
            p={1}
            mr={1}
            onClick={() => handleRemoveCategory(item)}
          >
            {item}
          </Badge>
        ))}
      </Box>
      <HStack mt={2}>
        {SURVEY_CATEGORY.map(({ name, value, color }) => {
          const isCategorySelected = surveyCategory.includes(value);
          if (isCategorySelected) {
            return null; // Hide the selected category
          }

          return (
            <Badge
              key={name}
              colorScheme={color}
              rounded={"md"}
              p={1}
              cursor={"pointer"}
              onClick={() => handleSelectedCategory(value)}
            >
              {name}
            </Badge>
          );
        })}
      </HStack>
    </Box>
  );
};

export default CategoryField;
