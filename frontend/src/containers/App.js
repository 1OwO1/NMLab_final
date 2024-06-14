import "./App.css";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Home from "./home";
import Login from "./login";
import SearchBar from "./searchBar";
import Register from "./register";
import { useNMLab } from "./hooks/useNMLab";
import DisplayKB from "./displayKB";
import Camera from "./camera";
import PrintMenu from "./printMenu";
import DisplayFile from "./displayFile";
import FileMenu from "./fileMenu";
//https://docs.expo.dev/ui-programming/z-index/
function App() {
  const { keyIn } = useNMLab();
  return (
    <div className="App">
      <SearchBar />
      {keyIn ? <DisplayKB /> : null}
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/login" element={<Login />} />
          <Route path="/printMenu" element={<PrintMenu />} />
          <Route path="/displayFile" element={<DisplayFile />} />
          <Route path="/fileMenu" element={<FileMenu />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
