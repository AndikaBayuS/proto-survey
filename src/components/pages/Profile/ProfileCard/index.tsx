import {
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";

import { ProfileCardProps } from "@/src/global/interfaces";

const ProfileCard = ({ name, image, level }: ProfileCardProps) => {
  return (
    <Box>
      <Box
        position={"relative"}
        roundedTop={"md"}
        bgGradient={
          "linear(109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2%)"
        }
      >
        <Avatar
          border={"3px solid"}
          borderColor={"white"}
          display={"block"}
          ml={["auto", 5]}
          mr={["auto", 0]}
          name={name}
          size={"2xl"}
          src={image}
          top={50}
        />
      </Box>
      <Box
        backgroundColor={"white"}
        pb={"5"}
        pl={5}
        pt={55}
        roundedBottom={"md"}
      >
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          {name}
        </Text>
        <Text color={"gray.600"}>Level {level}</Text>
        <Text>Di sini harusnya badge atau konten lain</Text>
      </Box>
    </Box>
  );
};

export default ProfileCard;
