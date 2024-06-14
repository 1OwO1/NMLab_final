import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import Box from "@mui/material/Box";
import { useNMLab } from "./hooks/useNMLab";
import Button from "@mui/material/Button";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import ReplayIcon from "@mui/icons-material/Replay";
//https://codesandbox.io/p/sandbox/react-webcam-demo-wrecn?file=%2Fsrc%2FCamera.js%3A2%2C25

const videoConstraints = {
  width: 860,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);

  const {
    saveFace,
    setSaveFace,
    sendphoto,
    countDown,
    setUrl,
    url,
    takePhoto,
    setTakePhoto,
  } = useNMLab();

  useEffect(() => {
    if (countDown == 0) {
      capturePhoto();
    }
  }, [countDown]);

  const capturePhoto = React.useCallback(async () => {
    //generate a photo based on base64
    //remove "data:image/png;base64," from head and decode to get the image
    // https://stackoverflow.com/questions/69167751/how-to-properly-send-an-image-from-react-to-java
    //https://stackoverflow.com/questions/58806971/how-can-i-take-a-picture-in-react-web-application-not-native
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    setTakePhoto(false);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };
  return (
    <Box
      display="flex"
      height="89vh"
      width={"100%"}
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      flexWrap="wrap"
    >
      {takePhoto ? (
        <>
          <Box width={"72%"} display="flex" justifyContent="center">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
              style={{ borderRadius: "40px" }}
            />
          </Box>
          <Box width={"28%"} fontSize={"100px"}>
            {countDown}
            {/* <button onClick={() => start()}>Refresh</button> */}
          </Box>
        </>
      ) : (
        url && (
          <>
            <Box width={"68%"}>
              <img src={url} alt="Screenshot" style={{ borderRadius: "40px" }} />
            </Box>
            <Box
              width={"32%"}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box padding="20px" fontSize={"40px"} sx={{ mt: "30px" }}>
                請確認您的臉在照片中
              </Box>
              <Box
                height="30vh"
                alignItems="center"
                flexDirection="row"
                sx={{ mt: "20px" }}
              >
                <Button
                  variant="contained"
                  style={{ fontSize: "25px", borderRadius: "10px" }}
                  onClick={() => {
                    sendphoto(url);
                  }}
                  endIcon={<DoneOutlineIcon />}
                >
                  確認
                </Button>

                <Button
                  variant="contained"
                  style={{ fontSize: "25px", borderRadius: "10px", marginLeft: "20px" }}
                  onClick={() => {
                    setTakePhoto(true);
                  }}
                  endIcon={<ReplayIcon />}
                >
                  重試
                </Button>
              </Box>
            </Box>
          </>
        )
      )}
    </Box>
  );
};

export default Camera;
