
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import axios from 'axios'
import {
  useHistory
} from "react-router-dom"
import { BaseURL } from '../baseUrl/BaseUrl'
import { UseGlobalState, UseGlobalStateUpdate } from '../../context/GlobalContext'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

function Login() {

  const golobalState = UseGlobalState()
  const globalStateUpdate = UseGlobalStateUpdate()
  console.log("lsdflafljl===============>>>>>>>>>>>>>>>>>... ", golobalState)
  console.log("lsdflafljl===============>>>>>>>>>>>>>>>>>... ", globalStateUpdate)



  const history = useHistory();
  const classes = useStyles();
  // const [alertMessage, setAlertMessage] = useState("")
  function Login(event) {
      event.preventDefault()

      var loginEmail = document.getElementById('email1').value
      var loginPassword = document.getElementById('password1').value

      axios({
          method: 'post',
          url: BaseURL + '/login',
          data: {
              email: loginEmail,
              password: loginPassword
          },
          withCredentials: true
      })
          .then(function (response) {
              if (response.status === 200) {
                  // alert(response.status)
                  console.log("loginRequestUser ====>", response.data.loginRequestUser.role)
                  globalStateUpdate(prev => ({
                      ...prev,

                      loginStatus: true,
                      user: response.data.loginRequestUser,
                      role: response.data.loginRequestUser.role
                  }))
                  alert(response.data.message)
                  if (response.data.loginRequestUser.role === "user") {
                      history.push('/')
                  } else if (response.data.loginRequestUser.role === "admin") {
                      history.push('/admin-home')
                  }
              } else if (response.status === 404) {
                  alert(response.data.message)
              }
          })
          .catch(function (error) {
              if (error.status === 403) {
                  alert(error.message)
              }
          });
      return false;

  }
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form  onSubmit={Login}>
                <p className="h4 text-center py-4">Sign In</p>
                <div className="grey-text">
                  
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    id="email1"
                  />
                  
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="password1"
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    login
                  </MDBBtn>
                </div>
                <p className='mt-3' onClick={goToForget}
                  style={{ cursor: "pointer" }}>Forget Password</p>
                <br />
                {show ? <div className="alert alert-danger" role="alert">
                  {show}
                </div> : null}
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;