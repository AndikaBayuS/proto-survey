import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Center, Link as TextLink, Text } from "@chakra-ui/react";
import Link from "next/link";

import PageNotFound from "../PageNotFound";

export default function SurveyError({ status }) {
  const renderError = (() => {
    switch (status) {
      case 403:
        return (
          <Center flexDir="column" gap={2} mt={50}>
            <Text fontSize="2xl" fontWeight="semibold">
              Aksi Tidak Diijinkan
            </Text>
            <Text>Anda tidak bisa mengisi survei yang anda buat</Text>
            <TextLink as={Link} color="messenger.500" href="/">
              Kembali ke halaman utama<ExternalLinkIcon mx='2px' />
            </TextLink>
          </Center>
        );
      case 406:
        return (
          <Center flexDir="column" gap={2} mt={50}>
            <Text fontSize="2xl" fontWeight="semibold">
              Aksi Tidak Diijinkan
            </Text>
            <Text>Anda harus menambahkan universitas pada profil</Text>
            <TextLink as={Link} color="messenger.500" href="/profile">
              Pergi ke halaman Profile <ExternalLinkIcon mx='2px' />
            </TextLink>
          </Center>
        );
      default:
        return <PageNotFound />;
    }
  })();

  return <Box>{renderError}</Box>;
}
