import { Box } from "@chakra-ui/react";

import Navbar from "@/src/components/common/Navbar";

interface Props {
  children: React.ReactNode;
}

const PageBase = ({ children }: Props) => {
  return (
    <Box backgroundColor={"gray.100"} minH={"100vh"}>
      <Navbar />
      <Box px={{ base: 4, md: 8, lg: 16 }} py={5}>
        {children}
      </Box>
    </Box>
  );
};

export default PageBase;
