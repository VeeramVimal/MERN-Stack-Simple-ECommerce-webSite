// import React from 'react';
import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import "./Styles.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useHistory, useParams } from "react-router-dom";
import { API_URL } from "../config/config";

const Test = () => {
  let { id } = useParams();
  console.log("idddd:", id);

  const [selectedDate, setSelectedDate] = useState(null);

  const [State, setState] = useState([]);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = () => {
    axios
      .get(`${API_URL}/User/editUser/${id}`)
      .then((response) => {
        console.log("responce", response);

        setState({
          Name: response.data.Name,
          Email: response.data.Email,
          Password: response.data.Password,
          DOB: response.data.selectedDate,
          MobileNumber: response.data.MobileNumber,
          Gender: response.data.Gender,
          Above_Eighteen: response.data.Above_Eighteen,
          Purpose: response.data.Purpose,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  let history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('event',event)
    const {
      Name,
      Email,
      Password,
      DOB,
      MobileNumber,
      Gender,
      Above_Eighteen,
      Purpose,
    } = State;

    axios
      .post(`${API_URL}/User/updateUser/${id}`, {
        Name: Name,
        Email: Email,
        Password: Password,
        DOB: selectedDate,
        MobileNumber: MobileNumber,
        Gender: Gender,
        Above_Eighteen: Above_Eighteen,
        Purpose: Purpose,
      })
      .then((response) => {
        console.log("respn", response);
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (e) => {
    const { checked } = e.target;
    // setState({
    //   checked: checked
    // })
    // if (checked === "Yes") {
    //   checked = "No";
    // } else if (checked === "No") {
    //   checked = "";
    // } else {
    //   checked = "Yes";
    // }

    setState((prevProps) => ({
      ...prevProps,
      Above_Eighteen: checked,
    }));
  };

  const handleBtnChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      Purpose: event.target.value,
    }));
  };

  const handleInChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      Gender: event.target.value,
    }));
  };

  return (
    <div className="Container">
      <div className="col-sm-12 center">
        <h3>Edit User Detail</h3>
      </div>

      <div className="col-sm-12 center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label> Name </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="Name"
              value={State.Name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            {/* <label> Email </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Email"
              name="Email"
              value={State.Email}
              onChange={handleInputChange}
              required
            />
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
              required
            />
          </div>

          <div className="form-group">
            <label>DOB</label>
            <DatePicker
              selected={selectedDate}
              placeholder="Date-of-Birth"
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              name="DOB"
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
            />
          </div>

          <div className="form-group">
            {/* <label> Mobile Number </label> */}
            <input
              className="form-control"
              type="tel"
              placeholder="Mobile Number"
              name="MobileNumber"
              value={State.MobileNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <label>
            Gender :
            <select value={State.Gender} onChange={handleInChange}>
              <option value="None" name="Gender">
                None
              </option>
              <option value="Male" name="Gender">
                Male
              </option>
              <option value="Female" name="Gender">
                Female
              </option>
              <option value="Non-Binary" name="Gender">
                Non-Binary
              </option>
            </select>
          </label>

          <div className="radio-btn-container">
            <div className="radio-btn">
              <input
                type="radio"
                value="Bussiness"
                id="Bussiness"
                onChange={handleBtnChange}
                name="Purpose"
              />
              <label for="Bussiness">Bussiness</label>
            </div>

            <div className="radio-btn">
              <input
                type="radio"
                value="Individual"
                id="Individual"
                onChange={handleBtnChange}
                name="Purpose"
              />
              <label for="Individual">Individual</label>
            </div>
          </div>

          <div className="form-group">
            <label> Above_Eighteen :</label>
            <input
              type="checkbox"
              name="AgeLimit"
              onChange={(e) => handleClick(e)}
              defaultChecked={State.Above_Eighteen}
            />
          </div>

          {/* <div className ='form-group'>
                  <label> 
                  <input>
                  type="checkbox"
                  name ="AgeLimit"
                        onChange={e => handleClick(e)}
                        defaultChecked={State.Above_Eighteen}</input>
                         Above_Eighteen : {State.Above_Eighteen.toString()}</label>
            
                   </div> */}

          <div className="form-grop">
            <input className="btn btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

//     return (
//         <div>

//             <EditUser/>

//             {/* ID:{id} */}
//             </div>
//     )
// }
export default Test;
