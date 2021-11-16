import React, { useState, useEffect, useHistory } from "react";
import { Button } from 'react-bootstrap';
import '../Styles.css';
import axios from "axios";
// import { toast } from 'react-toastify';

function Auth(props) {
  const [login, setLogin] = useState('');
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');

  const [State, setState] = useState({
    Email: "",
    Password: "",
  })

  useEffect(() => {
    getLogin()
    getdetails()

  }, [])

  const getdetails = () => {
    var myData = JSON.parse(localStorage.getItem('savedUserToken'));

    if (myData) {
      props.history.push("/cart")
    }
  }

  const getLogin = () => {

    axios.get("http://localhost:8000/User/getUser")
      .then((response) => {
        setLogin(response.data)
      })
  }

  const InputChange = (event) => {
    switch (event.target.name) {
      case 'Email':
        setState({ ...State, ...{ "Email": event.target.value } });
        break;
      case 'Password':
        setState({ ...State, ...{ "Password": event.target.value } });
        break;
      default:
        break;
    }
  }
  const validationCheck = () => {
    let isValid = true;
    {
      login && login.length > 0 && login.map(el => {
        let emailErr = el.Email
        let passwordErr = el.Password
        if (State.Email == "" || State.Email === undefined) {
          setEmailError("Email field is required")
          isValid = false
        } else if (emailErr !== State.Email) {
          setEmailError("Invalid Email")
          // setEmailError("")
          isValid = false
        } else {
          setEmailError("")
        }

        if((State.Password === undefined)|| (State.Password == null)||(State.Password == "")){
          setPasswordError("Please enter your Password.")
          isValid = false
        }else if (passwordErr !== State.Password) {
          setPasswordError("Password is not match")
          // setPasswordError("")
          isValid = false
        }else{
          setPasswordError("")
        }
      })
      return isValid;
    }

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    var validstatus = validationCheck();
    if (!validstatus) {
      const {
        Email, Password
      } = State;

      axios.post('http://localhost:8000/User/logUser', {
        Email: Email,
        Password: Password,
      })
        .then((response) => {
          if (response.data) {
            let token = response.data.data;
            localStorage.setItem("savedUserToken", 'Bearer' + token)
            axios.defaults.headers.common['Authorization'] = 'Bearer' + token

          }
          props.history.push("/cart")
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }

  const handleClick = () => {
    props.history.push({
      pathname: "/Register",
      data: {}
    });
  }


  return (
    <div className='container'>
      <div className='col-sm-12 center'>
        <h3>Login Page</h3>
      </div>

      <div className='col-sm-12 center'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            {/* <label> Email </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              name="Email"
              value={State.Email}
              onChange={InputChange}
            />
            <div style={{ fontsize: 4, color: "red" }}>
              {EmailError}</div>
          </div>

          <div className='form-group'>
            {/* <label> Password </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Password"
              name="Password"
              value={State.Password}
              onChange={InputChange}
            />
            <div style={{ fontsize: 4, color: "red" }}>
              {PasswordError}</div>

          </div>
          <div className='form-group'>
            <Button block size="lg"
              className="btn btn-primary"
              type='submit' >Signin</Button> </div>

        </form>
      </div>
      <div className="col-md-12 right">
        <Button
          class="btn btn-success"
          onClick={handleClick}>Register</Button> </div>
    </div>
  )
}
export default Auth;