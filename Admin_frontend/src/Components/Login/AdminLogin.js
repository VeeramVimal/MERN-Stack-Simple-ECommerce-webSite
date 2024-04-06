import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../Styles/Styles.css";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config/config";
import createTokenProvider from "react-router-dom";
// import {  useHistory } from "react-router-dom";

function Auth(props) {
  const [Login, setLogin] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  // console.log(PasswordError,"PasswordError", EmailError);
  const [State, setState] = useState({
    Email: "",
    Password: "",
  });

  useEffect(() => {
    getLogin();
    getdetails();
  }, []);

  const getLogin = () => {
    // axios.get("http://localhost:8000/Admin/getAdmin")
    axios.get(`${API_URL}/Admin/getAdmin`).then((responce) => {
      setLogin(responce.data);
    });
  };

  const getdetails = () => {
    var myData = localStorage.getItem("savedToken");
    if (myData) {
      props.history.push("/list");
    }
  };

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const validationCheck = () => {
    let isValid = true;
    {
      Login &&
        Login.length > 0 &&
        Login.map((el) => {
          let emailErr = el.Email;
          let passwordErr = el.Password;
          if (State.Email == "" || State.Email === undefined) {
            setEmailError("Email field is required");
            isValid = false;
          } else if (emailErr !== State.Email) {
            setEmailError("Invalid Email");
            isValid = false;
          } else {
            setEmailError("");
          }

          if (
            State.Password === undefined ||
            State.Password == null ||
            State.Password == ""
          ) {
            setPasswordError("Please enter your Password.");
            isValid = false;
          } else if (passwordErr !== State.Password) {
            setPasswordError("Password is not match");
            isValid = false;
          } else {
            setPasswordError("");
          }
        });
      return isValid;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var validstatus = validationCheck();

    if (!validstatus) {
      const { Email, Password } = State;
      // if(State.Email == ''){
      //   toast.warning("Enter Email_Id ");
      //   return 0;
      // }
      // if(State.Password == ''){
      //   toast.warning("Enter Password");
      //   return 0;
      // }
      // http://localhost:8000/Admin/logUser
      axios
        .post(`${API_URL}/Admin/logUser`, {
          Email: Email,
          Password: Password,
          //  token: token
        })
        .then((response) => {
          toast.success("Success");
          if (response.data) {
            let token = response.data.data;
            localStorage.setItem("savedToken", "Bearer" + token);
            axios.defaults.headers.common["Authorization"] = "Bearer" + token;
          }
          props.history.push("/list");
        })
        .catch((error) => {
          toast.error(error.response.data);
          console.log(error);
        });
    } else {
      alert("Something Error");
    }
  };

  return (
    <div className="container">
      <div className="col-sm-12 center">
        <h3>Login Page</h3>
      </div>

      <div className="col-sm-12 center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label> Email </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              name="Email"
              value={State.Email || ""}
              onChange={handleInputChange}
            />
            <div style={{ fontsize: 4, color: "red" }}>{EmailError}</div>
          </div>
          <div className="form-group">
            {/* <label> Password </label> */}
            <input
              className="form-control"
              type="Password"
              placeholder="Password"
              name="Password"
              value={State.Password}
              onChange={handleInputChange}
            />
            <div style={{ fontsize: 4, color: "red" }}>{PasswordError}</div>
          </div>
          <div className="form-group">
            <Button block size="lg" className="btn btn-primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Auth;
