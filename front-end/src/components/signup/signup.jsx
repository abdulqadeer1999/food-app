import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import { BaseURL } from '../../baseUrl/BaseUrl'
import {
  useHistory
} from "react-router-dom";
 import { UseGlobalState, UseGlobalStateUpdate } from '../../context/GlobalContext'

import axios from "axios";


import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


function Signup() {

  const setGlobalState = UseGlobalStateUpdate()
  const globalState = UseGlobalState();
  let history = useHistory()
  // const classes = useStyles();

  function signup(event) {
      event.preventDefault()

      console.log('clicked')
      var userName = document.getElementById('name').value
      var userEmail = document.getElementById('email').value.toLowerCase()
      var userPassword = document.getElementById('password').value

      // console.log(userEmail)
      var userData = {
          name: userName,
          email: userEmail,
          password: userPassword
      }
      console.log(userData)
      axios({
          method: 'post',
          url: BaseURL + '/signup',
          data: userData, 
          withCredentials: true

      })
          .then(function (response) {
              console.log(response);
              if (response.data.status === 200) {
                  alert(response.data.message)
                  console.log(response.data)
                  history.push('/login')
              } else {
                  alert(response.data.message)
                  console.log(response.data)
              }
          })
          .catch(function (error) {
              alert(error.message)
              console.log(error.message)


          });

      document.getElementById("name").value = ""
      document.getElementById("email").value = ""
      document.getElementById("password").value = "" 

      return false;
  }



  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              
                <p className="h4 text-center py-4">Sign up</p>
                <form onSubmit = {signup}>
                <div className="grey-text">
            
                  <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    id="name"
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
                  
                  <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
               
                </div>

{/*                 
                { <div className="col">
                  <p>Already have an account?
                                            <span onClick={handleClick}
                      className="text-primary ml-1" style={{ cursor: "pointer" }}>
                      Login
                     </span>
                  </p>
                </div>
               } */}
                </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;