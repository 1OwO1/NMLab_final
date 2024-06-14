import React from "react";
import NestedCard from "../../components/card";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { useNMLab } from "../hooks/useNMLab";
import { useNavigate } from "react-router";
import AdCard from "../../components/funcCard";
import AdCard2 from "../../components/adCard2";

const Wrapper = styled.div`
  width: 70%;
  height: 100%;
  margin: 5px 5px 5px 5px; // top right bottom left
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
`;
// overflow-y: scroll;

const title = [
  "註冊帳號",
  "儲值／繳費",
  "好康／紅利",
  "訂票／取票／訂房",
  "寄件／購物",
  "列印／掃描",
];
const description = [
  "通行所有服務",
  "遊戲點數、停車費",
  "K-POINT、銀行",
  "電影票、火車票",
  "門市預購、交貨便",
  "雲端列印、檔案列印",
];

const description2 = [
  "你的臉就是密碼",
  "ETC、罰單、信用卡",
  "證券保險、高鐵",
  "飯店、機票、租車",
  "把你啊罵賣掉、網購、快遞",
  "影印、掃描、傳真",
];

const adTitle = ["JavaScript 從入門到入土", "即刻註冊 K-ANIME", "我們值得信任的理由"];

const adDescription = [
  "無論您是初學者還是資深大佬，我們都會引領您從基本語法、進階技巧，一直到高手才知道的秘技。最後，你會決定去學 TypeScript。",
  "各路強檔動畫隨選隨看，一個月免費試用，如果是勇者欣梅爾的話，一定會馬上註冊的。",
  "了解我們是如何負責任地收集客戶資料並改善服務，我們承諾不會隨意分享或販賣您的個人資料，除非被無̸̨̓名̷͕̃̏之̷͙̈̄存̶̝̹̿̚在̷̧͂所逼迫。您的資料，或許將被分̵͓͗享̷̜̔ͅ予̵̯̜̑̒第̷͇͋三̴͕̀̈方̶̦̓͜，̵̥̆但̸͉̪̅̚這̴͇͈͌̒些̴͈͈̀̾第̵̬͍̍̍三̸̡̔͋方̷̠͖͌皆接與̶͓̣̥͂͠͝吾̸̰̲̆̏͛&̷̗͑̓͜*̸̖̩̝̎͘m̴̟͈̽̈ą̵͓̓輩̴̻͈̊̑͂一̴̦̐͊同̵͉̺̼̋̏侍̸͔̥̹̒奉̵̺͑͋̌於̵͇̿̈́͝深̷̥͇̂́淵之 w!&s̴̰̉d̷̖̪͘͝主̵̡̺̓，̵̖͓͋並̷̪̆對̶̀ͅ您cv,̷̜̣̬̦̿w̷̫̞͒̍̈͜.̴̢̧͍̗͓̰̈́̍͒̄̑͝͝.̶̧͙̜̃̿͋͋̊̍̇的̶̱̈́͑̊̔͠͝秘̴̡̛̠̦͎̘̤͎̀̀̅̈́̉͠s̶̨̧̠̰̭̭̃́̑̕ͅ]̷̨͚͎̮͑̈́͂͝ͅ密̵̡̜̮̰͈̗̝̒̏͌[̶̤̐͝與̸̨̢̺̦̼̈́̔͛͂̀̅̕w̸͖͙̠̓̏̍s̶̛̜͓͌͊͗̍̓͝靈̴̠̘͂̿̒魂̵͕̈́̔̇̉͐͒̆̽͗̎̕保̶̞̈́́̃̇̄̐͐̀;̴̧͉͂͛̾̌̃̚持̵͓̐同̴̫̳̠͓̩͈͕͌̍̃͂͒̈́̃̌͊͝ͅ[̷̦͍̺̥̺̼̤̱̳̤̐͆̓̔等̴̼̪̻̲̒͒̅́̕[̸̳̲̦̰̰͈̤̹͇̎̔̐̃̓̆̎͛͜之̷̛̙̬́̎͌̓̋͊̓̈́͆̚敬̴̨̨̼͓̞̺̟̽̿ͅ畏̶̳͙̜̼̭͔̞̙̱͌͂̌̈͒̈́̾͗͑͜͜。̷̟̱̐",
];

const adAction = ["[object Object]", "前往 K-ANIME", "信̶̘̱̮̟̆̈̒̒̚͜ͅͅ任̴̗̪͕̺̜̦̜̰̏͘我̵͓̃̅̀̋̅̒們̸̡͙̬̩̯̘̹̺̖̓"];

export default function Home(props) {
  const { login, setLogin } = useNMLab();
  const navigate = useNavigate();
  const selectCard = (title) => {
    if (title === "註冊帳號") navigate("/register");
    else if (title === "列印／掃描") navigate("/printMenu");
  };
  return (
    <Box display="flex" gap={3}>
      <Wrapper>
        {title.map((t, i) => (
          <Box width="50%" height="30%">
            <NestedCard
              title={t}
              description={description[i]}
              description2={description2[i]}
              selectCard={selectCard}
            />
          </Box>
        ))}
      </Wrapper>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ m: "5px", mt: "25px", gap: "25px" }}
      >
        {adTitle.map((t, i) => (
          <AdCard2
            key={i}
            title={t}
            description={adDescription[i]}
            actionText={adAction[i]}
          />
        ))}
      </Box>
    </Box>
  );
}
