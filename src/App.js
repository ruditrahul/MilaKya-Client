import React, { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/Landing Page/LandingPage";
import ContentPage from "./components/Content Page/ContentPage";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import HowToUse from "./components/HowToUse/HowToUse";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./redux/Auth/authActions";
import { clearErrors } from "./redux/Error/errorActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (token) {
      dispatch(clearErrors());
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Router exact path="/">
            {token ? <ContentPage /> : <LandingPage />}
          </Router>
          <Router exact path="/profile">
            <Profile />
          </Router>
          <Router exact path="/form">
            <Form />
          </Router>
          <Route path="/how to use">
            <HowToUse />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
