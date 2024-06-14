import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { api } from "../api";
var XMLHttpRequest = require("xhr2");

var client = new XMLHttpRequest();

const NMLabContext = createContext({
  login: false,
  name: "",
  num: 0,
  keyIn: false,
  input: "",
  reset: () => {},
  inputStatus: "",
  phone_number: "",
  password: "",
  search: "",
  saveFace: "false",
  countDown: 0,
  url: "",
  fileName: {},
  takePhoto: false,
  fileUrl: "",
  chooseFile: () => {},
  takephoto: () => {},
  sendphoto: () => {},
});
const NMLabProvider = (props) => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [num, setNum] = useState(0);
  const [keyIn, setKeyIn] = useState(false);
  const [input, setInput] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [saveFace, setSaveFace] = useState("false");
  const [countDown, setCountDown] = useState(5);
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [takeFile, setTakeFile] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [faceStatus, setFaceStatus] = useState("none");
  const [takePhoto, setTakePhoto] = useState(false);
  const [fileName, setFileName] = useState([]);
  let timer = useRef();
  let waitTimer = useRef();

  const reset = () => {
    navigate("/");
    setUrl("");
    setLogin(false);
    setSaveFace("false");
    setSearch("");
    setInputStatus("");
    setInput("");
    setName("");
    setNum(0);
    setKeyIn(false);
    setTakePhoto(false);
    setTakeFile(false);
    setFileUrl("");
    setFaceStatus("none");
    setFileName([])
  };
  const chooseFile = (filename) => {
    console.log("chooseFile", filename);
    api.askPDF(url, filename);
    setTakeFile(true);
  };
  useEffect(() => {
    if (takeFile) {
      waitTimer.current = setInterval(async () => {
        let log = await api.getPDF();
        if (log.data.done) {
          setTakeFile(false);
          setFileUrl(log.data.file);
          clearInterval(waitTimer.current)
        }
      }, 1000);
    }
  }, [takeFile]);
  useEffect(() => {
    if (fileUrl != "") navigate("/displayFile");
  }, [fileUrl]);
  const takephoto = (state) => {
    console.log("takephoto", state);
    if (state == "register") setSaveFace("processingRegister");
    else if (state == "login") setSaveFace("processingLogin");
    navigate("/camera");
    setTakePhoto(true);
  };

  const sendphoto = () => {
    console.log("sendphoto", saveFace);
    if (saveFace == "processingRegister") {
      setSaveFace("pendingRegister");
      navigate("/register");
    } else {
      setSaveFace("pendingLogin");
      navigate("/login");
    }
  };
  // login send photo to backend
  const tryLogin = async () => {
    let log = await api.loginFace(url);
    if (log.data.waiting) {
      setFaceStatus("login");
      setName(log.data.username);
      console.log(log.data.username);
    } else setSaveFace("false");
  };
  useEffect(() => {
    if (saveFace === "pendingRegister") {
      console.log(api.registerFace(name, url));
      setSaveFace("true");
    }
    if (saveFace === "pendingLogin") {
      tryLogin();
    }
  }, [saveFace]);
  //countdown for taking photo
  useEffect(() => {
    if (takePhoto) {
      timer.current = setInterval(() => {
        setCountDown((prevCount) => {
          return prevCount - 1;
        });
      }, 1000);
    }
  }, [takePhoto]);
  //reset countdown for taking photo
  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timer.current);
      setCountDown(5);
      setTakePhoto(false);
    }
  }, [countDown]);

  useEffect(() => {
    if (faceStatus === "login") {
      waitTimer.current = setInterval(async () => {
        let log = await api.waitLoginProcess();

        if (log.data.done) {
          setFaceStatus("none");
          setFileName(log.data.filenames);
          console.log(log.data.filenames);
        }
      }, 1000);
    } else if (faceStatus === "none") {
      if (waitTimer.current) setSaveFace("trueLogin");
      clearInterval(waitTimer.current);
    }
  }, [faceStatus]);

  useEffect(() => {
    client.open("POST", "http://localhost:5500/set_mode", true);
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (keyIn) client.send("mode=keyboard");
    else client.send("mode=normal");
  }, [keyIn]);

  // init input
  useEffect(() => {
    if (!keyIn) {
      setInput("");
      setInputStatus("");
    }
    if (keyIn) {
      switch (inputStatus) {
        case "name":
          if (name.length > 0) setInput(name);
          else setInput("");
          break;
        case "password":
          if (password.length > 0) setInput(password);
          else setInput("");
          break;
        case "phone_number":
          if (phone_number.length > 0) setInput(phone_number);
          else setInput("");
          break;
        case "search":
          if (search.length > 0) setInput(search);
          else setInput("");
          break;
      }
    }
  }, [keyIn, inputStatus]);
  //keyboard input display
  useEffect(() => {
    // This effect will run after every render
    if (keyIn) {
      switch (inputStatus) {
        case "name":
          setName(input);
          break;
        case "password":
          setPassword(input);
          break;
        case "phone_number":
          setPhoneNumber(input);
          break;
        case "search":
          setSearch(input);
          break;
      }
    }
  }, [input]);

  return (
    <NMLabContext.Provider
      value={{
        login,
        name,
        num,
        keyIn,
        input,
        inputStatus,
        password,
        phone_number,
        search,
        saveFace,
        countDown,
        url,
        takePhoto,
        fileName,
        takeFile,
        fileUrl,
        reset,
        setTakePhoto,
        setUrl,
        sendphoto,
        takephoto,
        setSaveFace,
        setSearch,
        setInputStatus,
        setInput,
        setLogin,
        setName,
        setNum,
        setKeyIn,
        chooseFile,
      }}
      {...props}
    />
  );
};

const useNMLab = () => useContext(NMLabContext);
export { NMLabProvider, useNMLab };
