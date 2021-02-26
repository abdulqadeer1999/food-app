import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import Home from '../home/Home.jsx'
// import Login from '../login/Login.jsx'
import Login from '../login/login'
// import Signup from './../signup/Signup.jsx'
import Signup from './../home/form1/signup'
// import Dashboard from './../dashboard/Dashboard.jsx'
// import ForgetPw from './../forgetPw/ForgetPassS1'
import Forget1 from './../../forgetpass/ForgetPass1'
// import Admin from '../admin/admin'
// import AdminDashboard from '../admin/adminDashboard'
// import { useGlobalState } from '../../context/globalContext'
import {useGlobalState} from '../../context/GlobalContext'
function RoutesConfig() {
    const globalState = useGlobalState()

    return (
        <div>
            <Router>
                {console.log('roll inside router=> ',globalState.roll)}
                {globalState.loginStatus === false ?
                    <div>
                        <Switch>
                            <Route exact path="/" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/admin" component={Admin} />
                            <Route path="/forgetpw" component={Forget1} />
                            <Route path="*" />
                            <Redirect to="/" />
                            <Route />
                        </Switch>
                    </div> : null}

                {globalState.roll === "user" && globalState.loginStatus === true ?
                    <>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/home" component={Home} />
                        <Route path="*" />
                        <Redirect to="/" />
                        <Route />
                    </> : null
                }
                {globalState.roll === "admin" && globalState.loginStatus === true ?
                    <>
                        <Route exact path="/" component={AdminDashboard} />
                        <Route path="*" />
                        <Redirect to="/" />
                        <Route />
                    </> : null
                }
            </Router>
        </div>
    );
}
export default RoutesConfig