import { Category, DataSource } from "@/@types/types";
import { getDataSources } from "@/services/sources-service";
import { createContext, useState } from "react";
import { ReactNode } from "react";
const { Client } = require("@notionhq/client");

let dataFetched = false;

// export async function getStaticProps() {
//   const notionSecret = process.env.NOTION_SECRET;
//   const notionDataSourcesId = process.env.NOTION_DATASOURCES_ID;
//   const notionDataConnectorsId = process.env.NOTION_DATACONNECTORS_ID;
//   const notionAttributesId = process.env.NOTION_ATTRIBUTES_ID;

//   if (
//     !notionSecret ||
//     !notionDataSourcesId ||
//     !notionDataConnectorsId ||
//     !notionAttributesId
//   ) {
//     throw Error(
//       "Must define NOTION_SECRET and NOTION_DATASOURCES_ID and NOTION_DATAATTRIBUTES_ID in env"
//     );
//   }

//   const notion = new Client({
//     auth: notionSecret,
//   });

//   let res = [];

//   let query = await notion.databases.query({
//     database_id: notionDataSourcesId,
//   });

//   res = [...query.results];

//   while (query.has_more) {
//     query = await notion.databases.query({
//       database_id: notionDataSourcesId,
//       start_cursor: query.next_cursor,
//     });
//     res = [...res, ...query.results].map((item) => item.properties);
//   }

//   return {
//     props: {
//       results: res,
//     },
//     revalidate: 86400, // 24h In seconds
//   };
// }
export async function getStaticProps() {
  let res: DataSource[] = [];
  // if (!dataFetched) {
  //   res = await getDataSources();
  // }
  res = await getDataSources();

  // if (res.length > 0) {
  //   dataFetched = true;
  // }

  return {
    props: {
      results: res,
    },
    // revalidate: 86400, // 24h In seconds
  };
}

const initialCategories: Category[] = [
  { name: "Appliances", items: [] },
  { name: "Blogging", items: [] },
  { name: "Calenders", items: [] },
  { name: "Clocks", items: [] },
  { name: "Cloud Storage", items: [] },
  { name: "Communication", items: [] },
  { name: "Entertainment", items: [] },
  { name: "Finance", items: [] },
  { name: "Games", items: [] },
  { name: "Health and Fitness", items: [] },
  { name: "Location and Navigation", items: [] },
  { name: "Security", items: [] },
];

const DataContext = createContext<any>({});

interface Props {
  children?: ReactNode;
  results: DataSource[];
  // any props that come into the component
}

export function DataProvider({ children, results }: Props) {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [categories, setCategories] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<[string]>(["All"]);
  const [sortby, setSortby] = useState("All");
  const [filter, setFilter] = useState("All");
  const [searchVal, setSearchVal] = useState("");

  const handleDataSources = () => {
    if (!dataSources[0]) {
      setDataSources(results);
    } else console.log("data is here ", results);
  };

  const sortbyCategories =
    selectedCategory[0] === "All"
      ? initialCategories
      : initialCategories.filter((category) =>
          selectedCategory.includes(category.name)
        );

  const sortbyStatus =
    sortby === "All"
      ? sortbyCategories
      : sortby === "Live"
      ? sortbyCategories.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter(
                      (item: any) => item.status === "Live Available"
                    ),
                  ],
                }
              : category;
          return filtered;
        })
      : sortby === "Requested"
      ? sortbyCategories.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter(
                      (item: any) => item.status === "Requested"
                    ),
                  ],
                }
              : category;
          return filtered;
        })
      : sortbyCategories.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter(
                      (item: any) =>
                        item.status !== "Live Available" &&
                        item.status !== "Requested"
                    ),
                  ],
                }
              : category;
          return filtered;
        });

  const sortbySearch =
    searchVal === ""
      ? sortbyStatus
      : sortbyStatus.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter((item: any) =>
                      item.name.toLowerCase().includes(searchVal)
                    ),
                  ],
                }
              : category;
          return filtered;
        });

  const sortbyFilter =
    filter === "All"
      ? sortbySearch
      : filter === "Dynamic Data"
      ? sortbySearch.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter((item: any) => item.isDynamic),
                  ],
                }
              : category;
          return filtered;
        })
      : sortbySearch.map((category: any) => {
          const filtered =
            category.items.length > 0
              ? {
                  name: category.name,
                  items: [
                    ...category.items.filter((item: any) => item.isDynamic),
                  ],
                }
              : category;
          return filtered;
        });
  const handleCategories = () => {
    console.log(dataSources);
    if (dataSources[0] && categories == null) {
      [...dataSources].map((source: any) => {
        source.categories.map((item: any) =>
          initialCategories.map((cat) => {
            if (cat.name == item) {
              cat.items.push(source);
            }
          })
        );
      });
      setCategories(initialCategories);
    }
    if (categories !== null) {
      if (selectedCategory[0] !== "All") {
        setCategories(sortbyCategories);
      } else setCategories(initialCategories);

      if (sortby !== "All") {
        setCategories(sortbyStatus);
      }
      if (searchVal !== "") {
        setCategories(sortbySearch);
      }
      if (filter !== "All") {
        setCategories(sortbyFilter);
      }
    }
  };
  // shows the datasources in the first selected Category

  const similarDataSources =
    categories &&
    initialCategories.find(
      (category: any) => category.name === selectedCategory[0]
    );

  return (
    <DataContext.Provider
      value={{
        dataSources,
        handleDataSources,
        categories,
        handleCategories,
        selectedCategory,
        setSelectedCategory,
        sortby,
        setSortby,
        searchVal,
        setSearchVal,
        similarDataSources,
        filter,
        setFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
