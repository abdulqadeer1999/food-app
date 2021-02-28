import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import {
  useHistory
} from "react-router-dom";
// import { useGlobalState, useGlobalStateUpdate } from "./../../../context/GlobalContext"

import axios from "axios";


import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

function Signup()  {
  



    let url = 'http://localhost:5000'
     let [change,setChange] = useState(true)
     let [show , setShow] = useState()

     let history = useHistory()
     function handleClick() {
       history.push("/login")
     }

function signup(e) {
 e.preventDefault()

 let name = document.getElementById("name").value;
 let email = document.getElementById("email").value
 let password = document.getElementById("password").value

 let newData = {
   name:name,
   email:email,
   password :password
 }
 axios({
  method: 'post',
  url: url + '/signup',
  data: newData,
  withCredentials: true
}).then((response) => {
  if (response.data.status === 200) {
      setChange(false)
  }
  else {
      history.push("/signup");
      setShow(response.data.message)
  }
}).catch((error) => {
  console.log(error);
});
}



  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit = {signup}>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    id=" name"
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    id="email"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="password"
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
                <div className="col">
                  <p>Already have an account?
                                            <span onClick={handleClick}
                      className="text-primary ml-1" style={{ cursor: "pointer" }}>
                      Login
                     </span>
                  </p>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;