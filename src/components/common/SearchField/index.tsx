import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchField = ({ defaultValue, onSubmit }: any) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(e.currentTarget.value);
    }
  };

  return (
    <InputGroup w="full">
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
      <Input
        backgroundColor="white"
        defaultValue={defaultValue}
        name="search"
        placeholder="Cari Survei"
        type="text"
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};

export default SearchField;
