import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Box } from "@mui/joy";
export default function InfoCard(props) {
  const { test, setName } = props;
  const func = (newname) => {
    setName(newname);
    test();
  };
  return (
    <Card sx={{ maxWidth: 360 }}>
      <Box sx={{ height: 70, mt: 5 }} display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
        <Typography variant="h5" component="div">
          Sign up to StartUp
        </Typography>
      </Box>
      <TextField id="standard-name-input" label="Name" type="Name" variant="standard" onChange={(e) => func(e.target.value)} />
      <TextField id="standard-password-input" label="Password" type="password" variant="standard" />
      <TextField id="standard-phone_number-input" label="Phone number" type="Phone number" variant="standard" />
      <CardContent>
        <Box sx={{ height: 70, mb: 2 }} display="flex" alignItems="center" justifyContent="center" flexWrap="wrap">
          <Button variant="outlined">
            <Typography fontSize="20px" component="div">
              Sign up
            </Typography>
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          By signing up you agree to the <u>Terms & Conditions</u>
        </Typography>
      </CardContent>
    </Card>
  );
}