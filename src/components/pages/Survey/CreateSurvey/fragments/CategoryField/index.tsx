import {
  Box,
  Divider,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";

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
    <Box w="full">
      <Text fontWeight="semibold">Kategori</Text>
      <Box></Box>
      <Box bgColor="gray.100" mt={3} p={2} rounded="md" w="full">
        <Box>
          {surveyCategory.length === 0 && (
            <Text color="gray.500">Belum ada kategori yang dipilih</Text>
          )}
          {surveyCategory.map((item: any) => (
            <Tag
              key={item}
              borderRadius="full"
              colorScheme="messenger"
              cursor="pointer"
              mr={1}
              size="md"
              variant="subtle"
            >
              <TagLabel textTransform="capitalize">{item}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveCategory(item)} />
            </Tag>
          ))}
        </Box>
        <Divider borderColor="blackAlpha.500" my={3} variant="dashed" />
        <HStack mt={2}>
          {SURVEY_CATEGORY.map(({ name, value, color }) => {
            const isCategorySelected = surveyCategory.includes(value);
            if (isCategorySelected) {
              return null;
            }

            return (
              <Tag
                key={name}
                borderRadius="full"
                colorScheme={color}
                cursor="pointer"
                onClick={() => handleSelectedCategory(value)}
              >
                <TagLabel>{name}</TagLabel>
              </Tag>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default CategoryField;
