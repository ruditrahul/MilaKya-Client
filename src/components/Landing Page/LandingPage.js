import React from "react";

import "./LandingPage.css";
import searchFind from "../../images/search_find.svg";
import { openDialog } from "../../redux/Dialog/dialogActions";
import { useDispatch } from "react-redux";
import CustomizedDialogs from "../Authentication/Authentication";

function LandingPage() {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(openDialog());
  }

  return (
    <div>
      <div className="main">
        <img src={searchFind} alt="My Happy SVG" />
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </h2>
      </div>
      <div className="footer">
        <CustomizedDialogs />
      </div>
    </div>
  );
}

export default LandingPage;
