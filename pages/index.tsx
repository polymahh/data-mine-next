import { Center, Text } from "@chakra-ui/layout";
import { useEffect } from "react";

export default function Home({ results }: any) {
  useEffect(() => {
    console.log(results);
  });
  return (
    <>
      <main>
        <Center>
          <Text>Hello</Text>
        </Center>
      </main>
    </>
  );
}
