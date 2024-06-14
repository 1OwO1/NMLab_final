import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useNMLab } from "./hooks/useNMLab";
import { CircularProgress } from "@mui/material";
const Wrapper = styled.div`
  margin: 0; // top right bottom left
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const serviceName = ["雲端列印", "代碼列印", "檔案列印", "影印", "掃描", "傳真"];

// overflow-y: scroll;
// background-color: #becbd3;
export default function FileMenu() {
  const { fileName, chooseFile, takeFile, reset } = useNMLab();
  console.log(fileName.length == 0);
  if (fileName.length === 0) {
    return (
      <Wrapper
        style={{
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Typography variant="h2" fontWeight="bold" align="center" margin="20px">
          沒有文件
        </Typography>
        <Button variant="contained" sx={{ fontSize: "30px" }} onClick={reset}>
          返回主頁面
        </Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      style={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      {takeFile ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" align="center">
            <span style={{ color: "rgb(56, 116, 203)" }}>選擇文件</span>
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="25vw 25vw 25vw"
            rowGap={4}
            columnGap={4}
            style={{
              margin: "0 auto",
            }}
          >
            {fileName.map((v, i) => (
              <ButtonBase
                sx={{
                  width: "25vw",
                  height: "200px",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "4px",
                  boxShadow: 3,
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
                onClick={() => chooseFile(v)}
              >
                <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                  {v}
                </Typography>
              </ButtonBase>
            ))}
          </Box>
        </>
      )}
    </Wrapper>
  );
}
