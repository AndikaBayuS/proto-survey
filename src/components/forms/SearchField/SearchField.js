import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function SearchField({ defaultValue, onSubmit }) {
  const handleKeyDown = (e) => {
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
        onKeyDown={handleKeyDown}
        placeholder="Cari Survei"
        type="text"
      />
    </InputGroup>
  );
};
