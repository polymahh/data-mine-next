import Hero from "@/components/data-sources/Hero";
import DataWrapper from "@/components/layout/DataWrapper";
import { Box, VStack } from "@chakra-ui/react";

const DataSources = () => {
  return (
    <VStack minH={"100vh"} bg={"bgLight"} spacing={0}>
      <Hero />
      <DataWrapper>{/* <CateoryCardList /> */}</DataWrapper>
    </VStack>
  );
};
export default DataSources;
