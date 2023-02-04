import { Box, Tab, TabList, Tabs } from "@chakra-ui/react";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const DataToggle = () => {
  // let navigate = useNavigate();
  // const location = useLocation();

  // const tabIndex = location.pathname.includes("/data-connectors") ? 1 : 0;

  const router = useRouter();
  const tabIndex = useRef(0);
  useEffect(() => {
    tabIndex.current = router.pathname.includes("/data-connectors") ? 1 : 0;
  }, [router]);

  return (
    <Box width={"full"}>
      <Tabs
        defaultIndex={tabIndex.current}
        variant="unstyled"
        color={"whiteText"}
        bgGradient={{
          base: "linear(to-r, bgLight 80%, primary 95%)",
          xl: "linear(to-r, bgLight 40%, primary 70%)",
        }}
      >
        <TabList
        // maxW={"container.xl"} mx={"auto"}
        >
          <Tab
            px={10}
            noOfLines={2}
            fontSize={["xs", "sm", "lg"]}
            fontWeight={600}
            _selected={{ borderBottom: "2px solid #6AD9C1" }}
            _hover={{ backgroundColor: "bgDark" }}
            onClick={() => router.push("/data-sources")}
          >
            DATA SOURCES
          </Tab>
          <Tab
            noOfLines={2}
            px={8}
            fontSize={["xs", "sm", "lg"]}
            fontWeight={600}
            _selected={{ borderBottom: "2px solid #6AD9C1" }}
            _hover={{ backgroundColor: "bgDark" }}
            onClick={() => router.push("/data-connectors")}
          >
            DATA CONNECTORS
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};
export default DataToggle;
