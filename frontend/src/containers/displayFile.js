import React, { useEffect } from "react";
import { Box, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

import { useNMLab, NMLabProvider } from "./hooks/useNMLab";
import { CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  //const base64WithoutPrefix = data.substr("data:application/pdf;base64,".length);
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });
  return blob;
};

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
export default function DisplayFile() {
  const {
    name,
    setName,
    keyIn,
    setKeyIn,
    inputStatus,
    setInputStatus,
    fileUrl,
    takeFile,
    reset
  } = useNMLab();
  const url = URL.createObjectURL(base64toBlob(fileUrl));

  return (
    <Wrapper>
      <Box
        display="flex"
        height="89vh"
        width={"35%"}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        flexDirection={"column"}
        fontSize="80px"
        fontWeight={"bold"}
        // bgcolor={"gray"}
      >
        <Box
          display="flex"
          // height="100px"
          // width="300px"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          flexDirection={"column"}
          gap={"50px"}
          // bgcolor={"blue"}
        >
          <ToggleButtonGroup
            color="primary"
            value="2"
            exclusive
            width="200px"
          >
            <ToggleButton value="1">單面</ToggleButton>
            <ToggleButton value="2">雙面</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            color="primary"
            value="1"
            exclusive
          >
            <ToggleButton value="1">A4</ToggleButton>
            <ToggleButton value="2">A3</ToggleButton>
            <ToggleButton value="3">B4</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            color="primary"
            value="1"
            exclusive
          >
            <ToggleButton value="1">1份</ToggleButton>
            <ToggleButton value="2">2份</ToggleButton>
            <ToggleButton value="3">3份</ToggleButton>
            <ToggleButton value="4">4份</ToggleButton>
            <ToggleButton value="5">5份</ToggleButton>
          </ToggleButtonGroup>

          <Button size={"large"} variant="contained" onClick={reset}>
            列印
          </Button>
        </Box>
        
      </Box>
      <Box
        display="flex"
        height="93vh"
        width={"65%"}
        alignItems="center"
        bgcolor="#becbd3"
        justifyContent="center"
        flexWrap="wrap"
      >

        <iframe src={url} width="100%" height="100%" title="PDF Viewer" />

      </Box>
    </Wrapper>
  );
}
