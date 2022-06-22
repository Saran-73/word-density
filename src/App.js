import "./styles.css";
import React, { useState, useEffect } from "react";
import {Box, Textarea, Input, Button, Flex, Text} from "@chakra-ui/react";

export default function App() {
  const [text, setText] = useState({
    keyText: "",
    inputText: ""
  });

  const [count, setCount] = useState({
    totalkeyWord: 0,
    totalWord: 0
  });

  const [result, setResult] = useState(0);

  useEffect(() => {
    const ANS = (count.totalkeyWord / count.totalWord) * 100;
    setResult(ANS);
  }, [count]);

  function handleChange(event) {
    setText((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value
      };
    });

  }

  function findWord() {
    if (text.keyText === "") return;

    const STR = text.inputText;
    const MATCH = STR.match(new RegExp(`${text.keyText}`,'gi'));
    const SPLIT = STR.split(/\s+/);

    if (MATCH === null){
      setCount({
        totalkeyWord: 0,
        totalWord: SPLIT.length
      });
     return;
    }

    setCount({
      totalkeyWord: MATCH.length,
      totalWord: SPLIT.length
    });
  }

  return (
    <Flex className="App" gap='5' width='full' p={7}>
     <Box width='50%' height='xl' >
     <Textarea
          value={text.inputText}
          placeholder="Your text.."
          name="inputText"
          onChange={handleChange}
          resize="vertical"
          height="full"
        />
     </Box>
        <Box width="50%">
        <Input
          type="text"
          value={text.keyText}
          name="keyText"
          placeholder="Keyword"
          onChange={handleChange}
        />
      <Button onClick={() => findWord()} mt={3}>find</Button>

      <Text fontSize="sm">WORD DENSITY IS {result}%</Text>

      <Text fontSize="sm">Total number of word's : {count.totalWord}</Text>
      <Text fontSize="sm">
        Total times the keyword '{text.keyText}' is used :
        {count.totalkeyWord}
      </Text>
        </Box>
    </Flex >
  );
}

// keyword matches not only the exact words but also the charactes inside other words