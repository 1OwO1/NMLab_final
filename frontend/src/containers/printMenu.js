import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from '@mui/material/ButtonBase';

import styled from "styled-components";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
  margin: 0; // top right bottom left
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const serviceName = ["雲端列印", "代碼列印", "檔案列印", "影印", "掃描", "傳真"]
const serviceDescription = [
  "列印您帳戶中儲存的檔案", 
  "列印由他人上傳的檔案", 
  "插入儲存裝置以列印文件",
  "為您手中的文件製作副本", 
  "將您手中的文件轉為電子格式", 
  "傳送傳真訊息"
]

// overflow-y: scroll;
// background-color: #becbd3;
export default function PrintMenu() {

  const navigate = useNavigate();

  return (
    <Wrapper
      style={{
        height: "85vh",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap:"30px"
      }}
    >
      <Typography variant="h4" fontWeight="bold" align="center"> 
        <span style={{ color: 'rgb(56, 116, 203)' }}>列印／掃描服務</span>
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="25vw 25vw 25vw"
        rowGap={4}
        columnGap={4}
        style={{
          margin: '0 auto',
        }}
      >
        {serviceName.map((v, i) => 
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
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
            onClick={() => {
              if(v === "雲端列印") navigate("/login");
            }}
          >
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom> {v} </Typography>
            <Typography fontSize={"20px"} align="center"> {serviceDescription[i]} </Typography>
          </ButtonBase>
        )}
      </Box>
    </Wrapper>
  );
}
