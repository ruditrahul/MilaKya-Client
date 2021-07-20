import React, { useState, useEffect } from "react";
import { InputLabel, Input, FormControl, Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import FormImage from "../../images/form.svg";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import "./Form.css";
import { useSelector, useDispatch } from "react-redux";

const places = [
  "KIIT Campus 5",
  "KIIT Campus 6",
  "KIIT Campus 7",
  "KIIT Campus 1",
  "KIIT Campus 2",
  "KIIT Campus 3",
  "KIIT Campus 8",
  "KSOM",
  "KSAC",
  "KIIT Medical Campus",
  "Central Library",
  "Khao Gali",
  "Kings' Palace 7",
  "Queen Castle 5",
  "None",
];

function Form() {
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [successfullMsg, setSuccessfullMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const userId = useSelector((state) => {
    if (state.auth.user) return state.auth.user._id;
  });

  function handleCloseSnackBar() {
    setOpenSnackBar(false);
  }

  // useEffect(() => {
  //   console.log("Calling the load User");
  //   if (token) dispatch(loadUser());
  // }, []);
  // const userId = useSelector((state) => {
  //   if (state.auth.user === null) {
  //     console.log("Calling Load User");
  //     dispatch(loadUser());
  //     if (!state.auth.user._id) return state.auth.user._id;
  //   }
  // });

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  function handleChange(e) {
    if (e.target.value === "None") setPlaceName("");
    else setPlaceName(e.target.value);
  }

  useEffect(() => {
    setOpenSnackBar(true);
  }, [errorMsg, successfullMsg]);

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessfullMsg("");
    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("place", placeName);
    formdata.append("desc", description);
    // Headers
    const config = {
      headers: {
        AUTH_TOKEN: token,
      },
    };
    axios
      .post("api/data/" + userId, formdata, config)
      .then((res) => setSuccessfullMsg(res.data.message))
      .catch((err) => {
        console.log(err.response);
        setErrorMsg(err.response.data.message);
      });

    setImage("");
    setDescription("");
    setPlaceName("");
  }
  return (
    <div className="form">
      <img src={FormImage} alt="Form SVG" />
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth="true" className="form-control">
          <TextField
            style={{ marginTop: "0" }}
            select
            label="Select a place where you found the item"
            onChange={handleChange}
            variant="outlined"
          >
            {places.map((place) => (
              <MenuItem key={place} value={place}>
                {place}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl fullWidth="true" className="form-control">
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={3}
            defaultValue=""
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth="true" className="form-control">
          <InputLabel htmlFor="my-input"></InputLabel>
          <Input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className="submit-btn"
          type="submit"
        >
          Submit
        </Button>
      </form>

      {successfullMsg && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={7000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            variant="filled"
            severity="success"
          >
            {successfullMsg}
          </Alert>
        </Snackbar>
      )}
      {errorMsg !== "" && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={7000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            variant="filled"
            severity="error"
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default Form;
