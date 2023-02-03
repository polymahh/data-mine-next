import Head from "next/head";
import Image from "next/image";
import { Center, Heading, Text } from "@chakra-ui/layout";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
const { Client } = require("@notionhq/client");

export async function getStaticProps() {
  const notionSecret = process.env.NOTION_SECRET;
  const notionDataSourcesId = process.env.NOTION_DATASOURCES_ID;
  const notionDataConnectorsId = process.env.NOTION_DATACONNECTORS_ID;
  const notionAttributesId = process.env.NOTION_ATTRIBUTES_ID;

  if (
    !notionSecret ||
    !notionDataSourcesId ||
    !notionDataConnectorsId ||
    !notionAttributesId
  ) {
    throw Error(
      "Must define NOTION_SECRET and NOTION_DATASOURCES_ID and NOTION_DATAATTRIBUTES_ID in env"
    );
  }

  const notion = new Client({
    auth: notionSecret,
  });

  let res = [];

  let query = await notion.databases.query({
    database_id: notionDataSourcesId,
  });

  res = [...query.results];

  while (query.has_more) {
    query = await notion.databases.query({
      database_id: notionDataSourcesId,
      start_cursor: query.next_cursor,
    });
    res = [...res, query.results];
  }

  return {
    props: {
      results: res,
    },
    revalidate: 86400, // In seconds
  };
}
export default function Home({ results }: any) {
  useEffect(() => {
    console.log(results);
  });
  return (
    <>
      <Head>
        <title>Data Mine</title>
        <meta name="description" content="data mine by Prifina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <main>
          <Center>
            <Text>Hello</Text>
          </Center>
        </main>
      </ChakraProvider>
    </>
  );
}
