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
import { useNavigate } from "react-router-dom";
export default function InfoCard(props) {
  const { click } = props;
  const { name, saveFace, takephoto, reset } = useNMLab();
  const navigate = useNavigate();
  const status = () => {
    switch (saveFace) {
      case "true":
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
            onClick={() => takephoto("register")}
            disabled={name == "" ? true : false}
          >
            <Typography fontSize="25px" component="div">
              掃描臉部
            </Typography>
          </Button>
        );
      case "pendingRegister":
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
              掃描完成
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
          通行所有服務
        </Typography>
      </Box>
      <TextField
        id="filled-search"
        variant="filled"
        label="帳號"
        type="Name"
        onClick={() => {
          click("name");
        }}
        sx={{ width: 300 }}
        inputProps={{ style: { fontSize: 30 } }}
        defaultValue={name}
        value={name}
      />

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
            disabled={saveFace == "true" ? (name != "" ? false : true) : true}
            sx={{ margin: 0, padding: 2, width: 300 }}
            onClick={() => {
              reset();
              navigate("/");
            }}
          >
            <Typography fontSize="25px" component="div">
              註冊
            </Typography>
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          註冊代表您已同意我們的<u>隱私權條款</u>
        </Typography>
      </CardContent>
    </Card>
  );
}
