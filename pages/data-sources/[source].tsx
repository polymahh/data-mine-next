import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import DataContext from "@/context/DataContext";
import BreadCrumbs from "@/components/source-page/BreadCrumbs";
import DataAttributes from "@/components/source-page/DataAttributes";
import Description from "@/components/source-page/Description";
import IsDynamic from "@/components/source-page/IsDynamic";
import Links from "@/components/source-page/Links";
import RelatedApps from "@/components/source-page/RelatedApps";
import SimilarDataSources from "@/components/source-page/SimilarDataSources";
import { useRouter } from "next/router";

const SourceData = () => {
  const route = useRouter();
  const [filtred, setFiltred] = useState<any>(null);
  const [filtering, setFiltering] = useState(false);
  const { categories, handleDataSources, handleCategories, dataSources } =
    useContext(DataContext);

  useEffect(() => {
    if (dataSources[0] !== null) {
      console.log(route.asPath, dataSources);
      const val = dataSources.find((item: any) =>
        route.asPath.includes(item.name.toLowerCase().trim().replace(/ /g, "-"))
      );
      setFiltred(val);
    }
  }, [dataSources, route.asPath]);

  useEffect(() => {
    handleCategories();
  }, [dataSources]);

  console.log(filtred);

  const name = filtred?.name;
  const category = filtred?.categories[0];

  return categories ? (
    filtred ? (
      <VStack alignItems={"start"} py={8} px={[2, 4, 10, 10, 12, 20]}>
        <BreadCrumbs name={name} category={category} />
        <Flex
          gap={[2, 2, 6]}
          alignItems={"center"}
          justifyContent={["center", "center", "left"]}
          pl={{ base: 0, md: 20 }}
          pb={14}
          width={"full"}
          flexWrap={"wrap"}
          direction={["column", "column", "row"]}
        >
          <Heading
            textAlign={"center"}
            color={"whiteText"}
            fontSize={["24px", "36px"]}
          >
            {name}
          </Heading>
          <IsDynamic dynamic={filtred.isDynamic} />
        </Flex>
        <VStack
          alignItems={"start"}
          width={"full"}
          px={{ base: 0, xl: 20 }}
          spacing={20}
        >
          <Description name={name} description={filtred?.description} />
          <Links docs={filtred?.documentationUrl} api={filtred?.apiUrl} />

          <DataAttributes
            sourceID={filtred.notionId}
            filtred={filtred && filtred}
          />

          <Flex
            gap={2}
            alignItems={"center"}
            justifyContent={["center", "left"]}
            flexWrap={["wrap", "nowrap"]}
            width={"full"}
          >
            <Text color={"whiteText"} fontSize={"20px"} fontWeight={600}>
              Resources:
            </Text>
            <Link
              noOfLines={1}
              color={"linkText"}
              fontSize={"18px"}
              href={"https://www.prifina.com/blog"}
              isExternal
            >
              https://www.prifina.com/blog
            </Link>
          </Flex>

          {/* related apps */}

          <RelatedApps relatedApps={filtred?.relatedApps} />

          {/* similar data sources */}
          {categories && (
            <>
              <Text
                color={"whiteText"}
                textAlign={"left"}
                width={"full"}
                fontSize={"24px"}
              >
                Similar Data Sources
              </Text>

              <SimilarDataSources category={category} />
            </>
          )}
        </VStack>
      </VStack>
    ) : (
      <Text color={"whiteText"} p={4}>
        Loading ...
      </Text>
    )
  ) : null;
};
export default SourceData;
