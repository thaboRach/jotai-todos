import { ChakraProvider, Heading, Flex } from "@chakra-ui/react";
import Todos from "./components/Todos";

function App() {
  return (
    <ChakraProvider>
      <Flex
        h="100vh"
        w="100%"
        direction="column"
        alignItems="center"
        gap="6"
        padding="4"
      >
        <Heading as="h1" size="3xl" noOfLines={1}>
          Todo List
        </Heading>
        <Todos />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
