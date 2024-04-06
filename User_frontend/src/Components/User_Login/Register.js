import React, { useState, useEffect, useHistory } from "react";
import { Button } from 'react-bootstrap';
import '../Styles.css';
import axios from "axios";
import { API_URL } from "../../config/config";
// import { toast } from 'react-toastify';

function Register(props) {
  const [EmailError, setEmailError] = useState('');
  const [PasswordError, setPasswordError] = useState('');
  const [State, setState] = useState({
    Email: "",
    Password: "",
  });

  const InputChange = (event) => {
    switch (event.target.name) {
      case 'Email':
        setState({...State,...{"Email":event.target.value}});
        break;
      case 'Password':
        setState({...State,...{"Password":event.target.value}});
        break;
      default:
        break;
    }
  }

  const validationCheck = () => {
     let isValid = true;
         let emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        if (State.Email== "" || State.Email===undefined) {
          setEmailError("Email field is required")
          isValid = false
        }else if(!emailReg.test(State.Email)){
          setEmailError("Invalid Email")
          isValid = false
        }else{
          setEmailError("")
        }
      
        let  passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/g
        //  alert(State.Password)
        if (State.Password== "" || State.Password===undefined) {
          setPasswordError("Password field is required")
          isValid = false
        }else if(!passwordRegex.test(State.Password)){
          setPasswordError(" Password should contain atleast one uppercase, atleast one lowercase, atleast one number, atleast one special character and minimum 6 and maximum 18")
          isValid = false
        }else{
          setPasswordError("")
        }
        return isValid; 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var validstatus = validationCheck();
    
    if(validstatus){
      const{
        Email,  Password
       } = State;
       
        axios
          .post(`${API_URL}/User/addUser`, {
            Email: Email,
            Password: Password,
          })
          .then((response) => {
            props.history.push("/login");
            // props.history.push('/Register/listTicket')
          })
          .catch((err) => {
            console.log(err.response);
          });   
    }
  }


  return (
    <div className='container'>
      <div className='col-sm-12 center'>
        <h3>Register Page</h3>
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
              className="btn btn-success btn-lg float-left"
              type='submit' >Submit</Button> </div>

        </form>
      </div>
    </div>
  )
}
export default Register;