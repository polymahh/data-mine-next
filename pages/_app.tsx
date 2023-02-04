import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { DataProvider } from "@/context/DataContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </ChakraProvider>
  );
}
