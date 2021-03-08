import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import { BaseURL } from '../../baseUrl/BaseUrl'
import {
  useHistory
} from "react-router-dom";
<<<<<<< HEAD
 import { UseGlobalState, UseGlobalStateUpdate } from '../../context/GlobalContext'
=======
import { BaseURL } from '../baseUrl/BaseUrl'
import { UseGlobalState, UseGlobalStateUpdate } from "../../context/GlobalContext"
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599

import axios from "axios";
import {BaseURL} from '../components/baseUrl/BaseUrl'


import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

<<<<<<< HEAD

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
=======
function SignUp() {

  const setGlobalState = UseGlobalStateUpdate()
  const globalState = UseGlobalState();
  let history = useHistory()
  const classes = useStyles();

  function signup(event) {
      event.preventDefault()

      console.log('clicked')
      var userName = document.getElementById('name').value
      var userEmail = document.getElementById('email').value.toLowerCase()
      var userPhone = document.getElementById('phone').value
      var userPassword = document.getElementById('password').value

      // console.log(userEmail)
      var userData = {
          userName: userName,
          userEmail: userEmail,
          userPhone: userPhone,
          userPassword: userPassword
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
              alert(error)

          });

      document.getElementById("name").value = ""
      document.getElementById("email").value = ""
      document.getElementById("phone").value = ""
      document.getElementById("password").value = ""
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599

      return false;
  }


  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>

              <p className="h4 text-center py-4">Sign up</p>
              <form onSubmit={signup}>
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
<<<<<<< HEAD
               
                </div>

{/*                 
                { <div className="col">
=======

                <div className="col">
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599
                  <p>Already have an account?
                                            <span onClick={handleClick}
                      className="text-primary ml-1" style={{ cursor: "pointer" }}>
                      Login
                     </span>
                  </p>
                </div>
<<<<<<< HEAD
               } */}
                </form>
=======

              </form>
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;