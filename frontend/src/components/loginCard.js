import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { TextField } from "@mui/material";
import { Box } from "@mui/joy";
import { useNMLab } from "../containers/hooks/useNMLab";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router";
export default function LoginCard(props) {
  const { test, setName, click } = props;
  const { keyIn, setKeyIn, phone_number, name, password, saveFace, takephoto } =
    useNMLab();
  const navigate = useNavigate();
  const status = () => {
    switch (saveFace) {
      case "trueLogin":
        return (
          <Button variant="contained" endIcon={<DoneOutlineIcon />} disabled={true}>
            <Typography fontSize="30px" component="div">
              掃描完成
            </Typography>
          </Button>
        );
      case "false":
        return (
          <Button
            variant="contained"
            sx={{ margin: 2, padding: 2, width: 300 }}
            endIcon={<CameraAltIcon />}
            onClick={() => takephoto("login")}
          >
            <Typography fontSize="25px" component="div">
              掃描臉部
            </Typography>
          </Button>
        );
      case "pendingLogin":
        return (
          <LoadingButton
            loading
            sx={{ margin: 2, padding: 2, width: 300 }}
            variant="outlined"
            endIcon={<CameraAltIcon />}
          >
            <Typography fontSize="25px" component="div">
              掃描臉部
            </Typography>
          </LoadingButton>
        );
      default:
        return (
          <Button
            variant="contained"
            sx={{ margin: 2, padding: 2, width: 300 }}
            endIcon={<CameraAltIcon />}
          >
            <Typography fontSize="25px" component="div">
              error
            </Typography>
          </Button>
        );
    }
  }; //autofocus={keyIn ? "true" : "false"}
  return (
    <Card sx={{ height: 550, width: 500 }}>
      <Box
        sx={{ height: 100, m: 5, mb: 3 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        <Typography fontSize="38px" component="div">
          登入以繼續使用
        </Typography>
      </Box>

      <Box
        sx={{ m: 3, mb: 0 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {status()}
      </Box>

      <CardContent>
        <Box
          sx={{ height: 90, mb: 2, mt: 0 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <Button
            variant="outlined"
            disabled={saveFace == "trueLogin" ? false : true}
            sx={{ margin: 0, padding: 2, width: 300 }}
            onClick={() => {
              navigate("/filemenu");
            }}
          >
            <Typography fontSize="25px" component="div">
              登入
            </Typography>
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          您的帳號活動將被收集以改善客戶體驗，
          <br />
          請見<u>隱私權條款</u>。
        </Typography>
      </CardContent>
    </Card>
  );
}
