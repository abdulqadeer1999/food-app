
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, { useState } from "react";
import axios from 'axios'
// import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {
  useHistory
} from "react-router-dom"
import { useGlobalState, useGlobalStateUpdate } from '../../context/GlobalContext';



// const Login = () => {

//   let url = "http://localhost:5000"
//   let [show,setShow] = useState()
//   let history = useHistory()
//   const globalState = useGlobalState()
//   const setGlobalState = useGlobalStateUpdate()

//   function login(e) {
// e.preventDefault();
// axios({
//   method : "post",
//   url : url + "/login",
//   data : {
//     email : document.getElementById('email1').value,
//     password : document.getElementById("pass1").value,
//   },
//   withCredentials : true
// }).then ((response) => {
//   if(response.data.status === 200){
//     setGlobalState(prev => ({
//       ...prev,
//       loginStatus : true,
//       user : response.data.user,
//       roll : "user"
//     }))
//   } else {
//     history.push("/login");
//     setShow(response.data.message)
//   }
// }).catch((error) => {
//   console.log(error);
// });
//   }

//   function forget() {
//     history.push("/forgetpass")
//   }





// import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const Login = () => {


  let url = "http://localhost:5000"
  let [show, setShow] = useState()
  let history = useHistory()
  const globalState = useGlobalState()
  const setGlobalState = useGlobalStateUpdate()

  function login(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: url + "/login",
      data: {
        email: document.getElementById('email1').value,
        password: document.getElementById("pass1").value,
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
        history.push("/login");
        setShow(response.data.message)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  function forget() {
    history.push("/forgetpass")
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
                  {/* <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  /> */}
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
                  {/* <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  /> */}
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="pass1"
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