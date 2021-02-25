import React from "react";


import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

const Forget1 = () => {

    let url = 'http://localhost:5000'
    let [next, setNext] = useState(true);
    let [next2, setNext2] = useState(true);
    let [resMsg, setResMsg] = useState('');
    let [resErrorMsg, setResErrorMsg] = useState('');
    let form = {
        boxShadow: "0 0 10px grey",
        padding: "20px",
        marginTop: "50px"
    }
    function nextStep() {
        setNext(prev => !prev)
    }
    function nextStep2() {
        setNext2(prev => !prev)
        console.log(document.getElementById('otp').value)
    }
    function getEmail(e) {
        e.preventDefault()
        let email = document.getElementById('forgot1').value;
        axios({
            method: 'post',
            url: url + '/forget-password',
            data: {
                email: email,
            },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if (response.data.status === 200) {
                setResMsg(response.data.message)
                nextStep()
            }
            else {
                setResErrorMsg(response.data.message)
            }
        }, (error) => {
            console.log(error);
        });
    }
    function ForgetPw2(e) {
        e.preventDefault()
        console.log(document.getElementById('password').value)
        console.log(document.getElementById('otp').value)
        axios({
            method: 'post',
            url: url + '/forget-password-2',
            data: {
                newPassword: document.getElementById('password').value,
                otp: document.getElementById('otp').value,
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.message)
                // location.href = "./login.html"
            }
            else {
                alert(response.data.message)
            }
        }, (error) => {
            console.log(error);
        });

    }
    return (
        <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Account Recovery</p>
                <div className="grey-text">
                 <form onSubmit= {getEmail}>
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
                   <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Next
                  </MDBBtn>
                  </div>
                  </form>
                  {/* <MDBInput
                    label="Confirm your email"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  /> */}
                  <form onSubmit={ForgetPw2}>
                  <MDBInput
                    label="Enter 6 digit otp"
                    icon="lock"
                    group
                    type="number"
                    validate
                    id = "otp"
                    
                  />
                  </form>
                </div>
                <MDBInput
                    label="EnterNew password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="password"
                  />

                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Change Password
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

export default Forget1;