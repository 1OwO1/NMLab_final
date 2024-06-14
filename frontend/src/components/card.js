import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Box, Button, Stack } from "@mui/joy";

const NestedCard = ({ title, description, description2, selectCard }) => {
  return (
    <Box sx={{ borderRadius: 0, mx: "40px", mt: "20px", mb: "10px" }}>
      <Card sx={{ borderRadius: 0, width: "100%", height: "100%" }}>
        <Button
          color="neutral"
          onClick={() => selectCard(title)}
          variant="plain"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <CardContent sx={{ width: "100%", padding: 0, margin: 3 }}>
            {/* <Typography level="body-xs">IN DESIGN</Typography> */}
            <Typography fontSize="4vh" level="title-lg">
              {title}
            </Typography>
          </CardContent>
          {/* </Button>
        <Button color="neutral" onClick={() => selectCard(title)} variant="plain"> */}
          <Card
            orientation="horizontal"
            size="sm"
            sx={{ width: "90%", bgcolor: "background.surface", borderRadius: 0, mb: 3 }}
          >
            <CardContent>
              {/* <Typography level="title-md">Sub project</Typography> */}
              <Typography level="body-sm" fontSize="3vh">
                {description}
                <br></br>
                {description2}
              </Typography>
            </CardContent>
          </Card>
        </Button>
        <CardOverflow
          variant="soft"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            justifyContent: "space-around",
            py: 1,
            borderTop: "1px solid",
            borderColor: "divider",
            padding: 0,
          }}
        >
          <Stack direction="row" sx={{ padding: 0, maxHeight: "70%", width: "100%" }}>
            <Button
              variant="plain"
              sx={{
                width: "50%",
                margin: 0,
                padding: 0,
                fontSize: "2.5vh",
                justifyContent: "center",
              }}
            >
              this is a button
            </Button>
            <Divider orientation="vertical" sx={{ margin: 0 }} />
            <Button
              variant="plain"
              sx={{
                width: "50%",
                margin: 0,
                padding: 0,
                fontSize: "2.5vh",
                justifyContent: "center",
              }}
            >
              this is also a button
            </Button>
          </Stack>
        </CardOverflow>
      </Card>
    </Box>
  );
};

{
  /* <Button variant="text" onClick={console.log("click")}>
            13
          </Button>
          <Divider orientation="vertical" />
          <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
            9
          </Typography> */
}
export default NestedCard;
