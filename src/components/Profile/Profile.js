import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../redux/Auth/authActions";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const profileData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [openSnackBar, setOpenSnackBar] = useState(true);
  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleCloseSnackBar() {
    setOpenSnackBar(false);
  }

  function handleClick(e) {
    console.log(e.currentTarget.value);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // If token, add to headers
    if (token) {
      config.headers["AUTH_TOKEN"] = token;
    }

    axios
      .delete(`/api/data/${e.currentTarget.value}`, config)
      .then((res) => {
        console.log(res.data);
        setSuccessMsg(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.message);
      });
  }

  useEffect(() => {
    dispatch(loadUser());
  }, [successMsg, errorMsg]);
  return (
    <div className="profile">
      <div className="header">
        <Avatar className="profile-img" />
        <h3>{profileData?.name}</h3>
        <p>
          Tempus quam pellentesque nec nam. Aliquet sagittis id consectetur
          purus ut. Ut etiam sit amet nisl purus in mollis nunc sed. Viverra
          maecenas accumsan lacus vel facilisis volutpat est. Fames ac turpis
          egestas integer eget. Dictumst vestibulum rhoncus est pellentesque
          elit ullamcorper. Pharetra diam sit amet nisl suscipit adipiscing. In
          hac habitasse platea dictumst quisque sagittis.
        </p>
      </div>
      <Row>
        {profileData?.images?.map((images) => (
          <Col lg={4} md={6}>
            <Card className="profile-card" id={images._id}>
              <CardHeader className="card-header" title={images.placeName} />
              <CardMedia
                component="img"
                className="card-media"
                image={`/uploads/${images.img.slice(8)}`}
              />
              <CardContent></CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Mark as found
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  key={images._id}
                  value={images._id}
                  onClick={handleClick}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Col>
        ))}
      </Row>
      {successMsg && (
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
            {successMsg}
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

export default Profile;
