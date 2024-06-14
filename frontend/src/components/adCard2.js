import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const AdCard2 = ({ title, description, actionText }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 4 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" align="left" style={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="left">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="large" variant="contained" style={{ width: "100%" }}>
          {actionText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdCard2;
