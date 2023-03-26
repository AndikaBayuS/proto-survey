import { Box } from "@chakra-ui/react";

import Navbar from "@/src/components/common/Navbar";

interface Props {
  children: React.ReactNode;
}

const PageBase = ({ children }: Props) => {
  <Box>
    <Navbar />
    {children}
  </Box>;
};
