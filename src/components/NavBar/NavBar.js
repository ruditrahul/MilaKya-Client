import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { logout } from "../../redux/Auth/authActions";
import { Link } from "react-router-dom";
import fetchFeeds from "../../redux/Feed/feedActions";
import "./NavBar.css";

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

function NavBar() {
  const [matchedPlaces, setMatchedPlace] = useState([]);
  const [place, setPlace] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (e) => {
    if (e.target.innerText === "Logout") dispatch(logout());
    setAnchorEl(null);
  };

  function handleClick(e) {
    if (e.target.innerText === "LOGOUT") dispatch(logout());
  }

  function handleChange(e) {
    if (e.target.value === "") setMatchedPlace("");
    else {
      let matches = places.filter((place) => {
        const regex = new RegExp(`^${e.target.value}`, "gi");
        return place.match(regex);
      });
      setMatchedPlace(matches);
      console.log(matches);
    }
  }

  return (
    <div className="navBar">
      <h2>
        <Link to="/" className="link">
          Mila Kya
        </Link>
      </h2>
      {token && (
        <div>
          <input
            placeholder="Search a place"
            onChange={handleChange}
            variant="outlined"
            className="search-input"
          />
          <div className="sortlisted-place">
            {matchedPlaces.length !== 0 &&
              matchedPlaces.map((place) => (
                <MenuItem
                  key={place}
                  value={place}
                  onClick={(e) => {
                    console.log(e.target.innerText);
                    e.target.parentNode.previousSibling.value =
                      e.target.innerText;
                    setPlace(e.target.innerText);
                    dispatch(fetchFeeds(e.target.innerText));
                    setMatchedPlace("");
                  }}
                >
                  {place}
                </MenuItem>
              ))}
          </div>
        </div>
      )}
      {token ? (
        <div>
          <Avatar onClick={handleClickMenu} style={{ cursor: "pointer" }} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/profile" className="link">
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/form" className="link">
                Report an Item
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <Link to="/" className="link">
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleClick}>
          <Link to="/how to use" className="link">
            How to Use
          </Link>
        </Button>
      )}
    </div>
  );
}

export default NavBar;
