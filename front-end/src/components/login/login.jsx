
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import axios from 'axios'
import {
  useHistory
} from "react-router-dom"
import { UseGlobalState, UseGlobalStateUpdate } from '../../context/GlobalContext';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const Login = () => {


  let url = "http://localhost:5000"
  let [show, setShow] = useState()
  let history = useHistory()
  const globalState = UseGlobalState()
  const setGlobalState = UseGlobalStateUpdate()

  function login(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: url + "/login",
      data: {
        email: document.getElementById('email1').value,
        password: document.getElementById("password1").value,
      },
      withCredentials: true
    }).then((response) => {
      if (response.data.status === 200) {
        setGlobalState(prev => ({
          ...prev,
          loginStatus: true,
          user: response.data.user,
          roll: "user"
        }))
      } else {
        history.push("/dashboard");
        setShow(response.data.message)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  function goToForget() {
    history.push("/forgetpw");
}





  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form  onSubmit={login}>
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