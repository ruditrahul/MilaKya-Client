import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { login, register, loadUser } from "../../redux/Auth/authActions";
import { clearErrors } from "../../redux/Error/errorActions";
import "./Authentication.css";

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(2),
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h3">{children}</Typography>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-evenly",
//     height: "15rem",
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

export default function CustomizedDialogs() {
  const error = useSelector((state) => state.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleClickOpen = (e) => {
    setClickedBtn(e.target.innerText);
    dispatch(clearErrors());
    setOpen(true);
  };

  function handleCloseDialog() {
    console.log("Calling the clear Errors....");
    dispatch(clearErrors());
    setName("");
    setEmail("");
    setPassword("");
    setClickedBtn("");
    setOpen(false);
  }

  const handleOnSubmit = () => {
    if (clickedBtn === "REGISTER") {
      const newUser = {
        name,
        email,
        password,
      };
      dispatch(register(newUser));
    } else if (clickedBtn === "SIGN IN") {
      const user = {
        email,
        password,
      };
      dispatch(login(user));
    }
  };

  function handleCloseSnackBar() {
    setOpenSnackBar(false);
  }

  useEffect(() => {
    console.log("Checking for errors");
    if (error.id === "LOGIN_FAIL" || error.id === "REGISTER_FAIL") {
      console.log("Found Error");
      setMsg(error.msg);
      setOpenSnackBar(true);
    } else {
      console.log("No errros moving forward");
      setMsg("");

      // if (open) {
      //   if (isAuthenticated === true) {
      //     handleCloseDialog();
      //   }
      // }
    }
  }, [error, isAuthenticated]);

  return (
    <div className="auth-btn">
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Register
      </Button>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Sign In
      </Button>
      <Dialog onClose={handleCloseDialog} open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleOnSubmit}>
          {clickedBtn === "REGISTER"
            ? "Welcome, Register"
            : "Welcome Back, Sign In"}
        </DialogTitle>
        <DialogContent dividers className="dialog-content">
          {clickedBtn === "REGISTER" && (
            <TextField
              autoComplete="off"
              id="input-field"
              label="Name"
              type="text"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <TextField
            id="input-field"
            autoComplete="off"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="input-field"
            label="Password"
            type="password"
            autoComplete="off"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleOnSubmit}
            color="primary"
            variant="contained"
          >
            Go
          </Button>
        </DialogActions>

        {msg && (
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
              {msg}
            </Alert>
          </Snackbar>
        )}
      </Dialog>
    </div>
  );
}
