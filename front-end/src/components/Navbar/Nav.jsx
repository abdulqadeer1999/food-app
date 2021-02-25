import React from "react";
import { Link } from 'react-router-dom'
import { useGlobalState} from '../../context/globalContext'
function Navbar(props) {
    const globalState = useGlobalState()
    return (
        <div className='sticky-top'>
            <nav className="navbar  navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Food</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    {globalState.loginStatus === true ?
                        <>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Dashboard <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <a className="text-success btn btn-outline-success" onClick={props.logout}>Logout<span className="sr-only">(current)</span></a>
                        </> :
                        <>
                            <Link className="btn btn-outline-success " to="/login">Login<span className="sr-only">(current)</span></Link>
                            <Link className="btn btn-outline-success ml-4" to="/signup">Signup <span className="sr-only">(current)</span></Link>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}
export default Navbar