import Hero from "@/components/data-sources/Hero";
import DataWrapper from "@/components/layout/DataWrapper";
import DataContext from "@/context/DataContext";
import { Box, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

export { getStaticProps } from "../context/DataContext";

const DataSources = () => {
  const { handleDataSources, results } = useContext(DataContext);

  useEffect(() => {
    console.log(results);
    handleDataSources(results);
  });
  return (
    <VStack minH={"100vh"} bg={"bgLight"} spacing={0}>
      <Hero />
      <DataWrapper>{/* <CateoryCardList /> */}</DataWrapper>
    </VStack>
  );
};
export default DataSources;
