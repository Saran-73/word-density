import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Textarea,
  Input,
  Button,
  useBreakpointValue,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AppFlex } from "./components/chakraOverrides/AppFlex";

export default function App() {
  const [text, setText] = useState({
    keyText: "",
    inputText: "",
  });

  const [count, setCount] = useState({
    totalkeyWord: 0,
    totalWord: 0,
  });

  const [result, setResult] = useState(0);
  const [isKeywordMissing, setIsKeywordMissing] = useState(false);
  const [notFound, setNotFound] = useState(null);
  const focusInput = useRef();
  const focusKeyInput = useRef();
  const focusButton = useRef();

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  useEffect(() => {
    const ANS = ((count.totalkeyWord / count.totalWord) * 100).toFixed(2);
    !isNaN(ANS) && setResult(ANS);
  }, [count]);

  useEffect(() => {
    if (text.keyText) {
      setIsKeywordMissing(false);
      setNotFound(false);
    }

    if (text.keyText === "" && text.inputText === "") {
      setResult(0);
      setCount({
        totalkeyWord: 0,
        totalWord: 0,
      });
      setIsKeywordMissing(false);
      setNotFound(false);
    }
  }, [text]);

  function handleChange(event) {
    setText((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  }

  function findWord() {
    if (text.inputText === "") {
      return focusInput.current.focus();
    }

    if (text.keyText === "") return setIsKeywordMissing(true);

    const STR = text.inputText.trim();
    const MATCH = STR.match(new RegExp(`${text.keyText}`, "gi"));
    const SPLIT = STR.split(/\s+/);
    const FILT = SPLIT.filter((eachword) =>
      new RegExp(`${text.keyText}`, "gi").test(eachword)
    );
    // .filter((x) => x.toLowerCase() === text.keyText.toLowerCase());

    // MATCH matches every letter the key is present (not accurate but helps to match multiple words)
    // In FILT - 1st .filter gives array of words which has the key(letter) (cant match multiple words)
    // 2nd .filter gives accurate exact match of single word (ignoring capitalization) (cant match multipe words) ( any presenece of non-alphabets like [. , /] means not a match unless provided in key)

    // const singleWordKey = SPLIT.filter(x => x === text.keyText.trim());
    const totalWordInKey = text.keyText.trim().split(" ").length;
    console.log(totalWordInKey);

    if (totalWordInKey === 1) {
      console.log(FILT);
    }

    if (MATCH === null) {
      setCount({
        totalkeyWord: 0,
        totalWord: SPLIT.length,
      });
      setNotFound(true);
      return;
    }

    setCount({
      totalkeyWord: MATCH.length,
      totalWord: SPLIT.length,
    });
  }

  // const responsive = useBreakpointValue({base : , md :  , lg:  })
  return (
    <Box className="App" w="full" p={10}>
      <Text
        as="h1"
        fontSize="5xl"
        fontWeight="medium"
        mb={5}
        textTransform="upperCase"
      >
        Word Density Finder
      </Text>
      <AppFlex customStyle={{ gap: "8", h: "70vh" }}>
        <Box w="50%">
          <Textarea
            value={text.inputText}
            placeholder="Your text.."
            name="inputText"
            onChange={handleChange}
            resize="vertical"
            height="full"
            overflow="scroll"
            ref={focusInput}
          />
        </Box>
        <Box w="50%">
          <Box h="25%" position="relative">
            <FormControl isRequired isInvalid={isKeywordMissing}>
              <Input
                type="text"
                value={text.keyText}
                name="keyText"
                placeholder="Keyword"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    focusButton.current.focus();
                    findWord();
                  }
                }}
                ref={focusKeyInput}
              />
              <FormErrorMessage>Keyword is required</FormErrorMessage>
            </FormControl>

            <Button
              onClick={() => findWord()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  return findWord();
                }
              }}
              ref={focusButton}
              position="absolute"
              bottom="40px"
              left="45%"
              right="45%"
              bg="blue.300"
              color="white"
              _hover={{
                bg: "blue.100",
                color: "blue.600",
              }}
            >
              FIND
            </Button>
          </Box>
          <Box
            border="2px"
            borderColor="gray.100"
            h="75%"
            borderRadius="0.6em"
            position="relative"
          >
            {notFound && (
              <Text
                as="h3"
                position="absolute"
                top="5px"
                left="30%"
                right="30%"
                color="pink.300"
                fontSize="22px"
              >
                Keyword not found
              </Text>
            )}
            <Text
              as="h2"
              fontSize="5xl"
              h="70%"
              fontWeight="medium"
              textAlign="center"
              display="grid"
              placeContent="center"
              color={
                result == 0
                  ? "black"
                  : result < 3 && result >= 1
                  ? "green.400"
                  : "red.300"
              }
            >
              {result}%
            </Text>
            <Box h="30%" py={5}>
              <Text fontSize="2xl">Total word's : {count.totalWord}</Text>
              <Text fontSize="2xl">
                Keyword repeated : {count.totalkeyWord}
              </Text>
            </Box>
          </Box>
        </Box>
      </AppFlex>
    </Box>
  );
}
