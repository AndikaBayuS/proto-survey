import { Button, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function PageNotFound() {
  const router = useRouter();
  return (
    <Center flexDirection="column" gap={1} mt={50}>
      <Text fontSize="2xl" fontWeight="semibold">
        404 | Halaman Tidak Ditemukan
      </Text>
      <Text>Halaman yang anda akses tidak ditemukan.</Text>
      <Button colorScheme="messenger" onClick={() => router.push("/")}>Kembali</Button>
    </Center>
  );
};
