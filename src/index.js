import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";

import App from "./App";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme =extendTheme({

})

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </StrictMode>
);
