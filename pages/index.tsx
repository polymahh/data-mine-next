import { Center, Text } from "@chakra-ui/layout";
import { useEffect } from "react";

export default function Home({ results }: any) {
  useEffect(() => {
    console.log("this is the index");
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
