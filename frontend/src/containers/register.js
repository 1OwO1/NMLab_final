import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import AdCard from "../components/adCard";
import InfoCard from "../components/infoCard";
import { useNMLab, NMLabProvider } from "./hooks/useNMLab";

const Wrapper = styled.div`
  height: 89vh;
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
  const { name, setName } = useNMLab();
  const [password, setPassword] = React.useState("");
  const [phone_number, setPhoneNumber] = React.useState("");
  const test = () => {
    console.log(name);
  };
  console.log("pass", setName);
  return (
    <Wrapper>
      <Box display="flex" height="89vh" width={"35%"} alignItems="center" justifyContent="center" flexWrap="wrap" fontSize="80px">
        Sign
        <br />
        Up
      </Box>
      <Box display="flex" height="89vh" width={"65%"} alignItems="center" bgcolor="#becbd3" justifyContent="center" flexWrap="wrap">
        <InfoCard test={test} setName={setName} />
      </Box>
    </Wrapper>
  );
}