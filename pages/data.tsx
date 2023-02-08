import CateoryCardList from "@/components/data-sources/CateoryCardList";
import Hero from "@/components/data-sources/Hero";
import DataWrapper from "@/components/layout/DataWrapper";
import DataContext from "@/context/DataContext";
import { Box, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

export { getStaticProps } from "../context/DataContext";

const DataSources = () => {
  const {
    handleDataSources,
    handleCategories,
    selectedCategory,
    searchVal,
    sortby,
    filter,
    dataSources,
  } = useContext(DataContext);

  useEffect(() => {
    handleDataSources();
  });

  useEffect(() => {
    console.log(dataSources);
    handleCategories();
  }, [dataSources, selectedCategory, searchVal, sortby, filter]);
  return (
    <VStack minH={"100vh"} bg={"bgLight"} spacing={0}>
      <Hero />
      <DataWrapper>
        <CateoryCardList />
      </DataWrapper>
    </VStack>
  );
};
export default DataSources;
