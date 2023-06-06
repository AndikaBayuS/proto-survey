import {
  Avatar,
  Box,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { ProfileCardProps } from "@/src/global/interfaces";

import ProfileSetting from "../ProfileSetting";

const ProfileCard = ({
  name,
  email,
  image,
  university,
  level,
  badges,
}: ProfileCardProps) => {
  return (
    <Box>
      <Box
        bgGradient="linear(109.6deg,  rgba(45,116,213,1) 11.2%, rgba(121,137,212,1) 91.2%)"
        position="relative"
        roundedTop="md"
      >
        <Avatar
          border="3px solid"
          borderColor="white"
          display="block"
          ml={["auto", 5]}
          mr={["auto", 0]}
          name={name}
          size="2xl"
          src={image}
          top={50}
        />
      </Box>
      <Box backgroundColor="white" pb="5" pl={5} pt={55} roundedBottom="md">
        <Text fontSize="xl" fontWeight="semibold">
          {name}
        </Text>
        <Text color="gray.600">Level {level}</Text>
        <Tabs isFitted colorScheme="messenger">
          <TabList>
            <Tab>Pencapaian</Tab>
            <Tab>Pengaturan</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <HStack>
                {badges.teknologi.map((badge: any, idx: any) => {
                  const isAchieved = badge.achieved ? "" : "grayscale(100%)";
                  return (
                    <Image
                      key={idx}
                      alt={badge.image}
                      boxSize="75"
                      cursor="pointer"
                      filter={isAchieved}
                      src={badge.image}
                    />
                  );
                })}
              </HStack>
            </TabPanel>
            <TabPanel>
              <ProfileSetting userData={{ name, image, email, university }} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileCard;
