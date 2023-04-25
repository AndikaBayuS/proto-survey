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
        bgGradient={
          "linear(109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2%)"
        }
        roundedTop={"md"}
      >
        <Avatar
          src={image}
          name={name}
          size={"2xl"}
          top={50}
          ml={["auto", 5]}
          mr={["auto", 0]}
          border={"3px solid"}
          display={"block"}
          borderColor={"white"}
        />
      </Box>
      <Box
        backgroundColor={"white"}
        pt={55}
        pl={5}
        pb={"5"}
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
