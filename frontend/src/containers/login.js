import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import AdCard from "../components/funcCard";
import LoginCard from "../components/loginCard";
import { useNMLab, NMLabProvider } from "./hooks/useNMLab";

const Wrapper = styled.div`
  margin: 0; // top right bottom left
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
// overflow-y: scroll;
// background-color: #becbd3;
export default function Register() {
  const { name, setName, keyIn, setKeyIn, inputStatus, setInputStatus } = useNMLab();
  const test = () => {
    window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    let pos = 0;
    switch (inputStatus) {
      case "name":
        pos = 80;
        break;
    }

    window.scrollTo({ top: pos, left: 0, behavior: "smooth" });
  }, [keyIn]);
  const click = (ss) => {
    setInputStatus(ss);
    setKeyIn(true);
  };
  return (
    <Wrapper>
      <Box
        display="flex"
        height="93vh"
        width={"65%"}
        alignItems="center"
        bgcolor="#becbd3"
        justifyContent="center"
        flexWrap="wrap"
      >
        <LoginCard test={test} setName={setName} click={click} />
      </Box>
      <Box
        display="flex"
        height="89vh"
        width={"35%"}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        fontSize="80px"
        fontWeight={"bold"}
      >
        歡迎回來
      </Box>

      {keyIn ? (
        <Box height="40vh" width="100%">
          hi
        </Box>
      ) : null}
    </Wrapper>
  );
}
