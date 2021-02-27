import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './../login/login'
import Signup from './../home/form1/signup'
// import Dashboard from './../dashboard/Dashboard.jsx'
import Dashboard from './../dashboard/cart/Dashboard'
import ForgetPw from './../../forgetpass/ForgetPass1'
import AdminDashboard from '../admin/adminDash'
import Basket from '../dashboard/cart/cart/Basket'
import CheckOutForm from '../dashboard/cart/cart/checkForm'
// import AddProducts from '../admin/AddProducts'
import AddProducts from '../admin/Products'

import { useGlobalState } from '../../context/GlobalContext'
function RoutesConfig() {
    const globalState = useGlobalState()

    return (
        <div>
            <Router>
                {globalState.role === null ?
                    <div>
                        <Switch>
                            <Route exact path="/" component={Signup} />
                            <Route path="/login" component={Login} />
                            <Route path="/forgetpw" component={ForgetPw} />
                            <Route path="*" />
                            <Redirect to="/" />
                            <Route />
                        </Switch>
                    </div> : null}

                {globalState.role === "user" ?
                    <>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/basket" component={Basket} />
                        {/* <Route path="/home" component={Home} /> */}
                        <Route path="/checkoutform" component={CheckOutForm} />
                        <Route path="*" />
                        <Redirect to="/" />
                        <Route />
                    </> : null
                }
                {globalState.role === "admin" ?
                    <>
                        <Route exact path="/" component={AdminDashboard} />
                        <Route exact path="/addproducts" component={AddProducts} />
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