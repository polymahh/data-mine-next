import CateoryCardList from "@/components/data-sources/CateoryCardList";
import Hero from "@/components/data-connectors/Hero";
import DataWrapper from "@/components/layout/DataWrapper";
import Header from "@/components/layout/Header";
import ConnectorCardList from "@/components/data-connectors/ConnectorCardList"
// import DataContext from "@/context/DataContext";
import { Box, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

// export { getStaticPaths } from "@/context/DataContext";
// export { getStaticProps } from "@/context/DataContext";

const DataConnectors = () => {
 
    return (
        <Box textAlign="center" fontSize="xl" bg={"bgLight"}>
          <VStack justifyContent={"stretch"} minH="100vh" spacing={0}>
            <Header />
            <Hero />
            <DataWrapper>
              <ConnectorCardList />
            </DataWrapper>
          </VStack>
        </Box>
      );
};
export default DataConnectors;
