

import React, { useEffect, useState, useContext } from 'react';
<<<<<<< HEAD
import { BaseURL } from '../baseUrl/BaseUrl'
=======
// import { BaseURL } from '../Components/Url/BaseURL'
import {BaseURL} from '../components/baseUrl/BaseUrl'
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599
import axios from 'axios'

const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()
const UseGlobalState = () => useContext(GlobalStateContext)
const UseGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)
<<<<<<< HEAD

function GlobalStateProvider({ children }) {

=======

function GlobalStateProvider({ children }) {

>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599
    const [data, setData] = useState({
        user: null,
        darkTheme: false,
        loginStatus: false,
        role: null,
        token: null,
        orderUser : null
    })

    
    useEffect(() => {
        
        axios({
            method: "get",
            url: BaseURL + '/profile',
            withCredentials: true
        })
        .then(function (response) {
            // handle success
            // console.log("response: ", response.status);
            if (response.status === 200) {
                console.log(response.data)
                console.log("lkdflasdfkj " , response.data.profile)
                setData(prev => ({ ...prev, loginStatus: true, user: response.data.profile, role: response.data.profile.role }))
            }
        })
        .catch(function (error) {
            // handle error
            // console.log("error: ==== ", error);
            if (error && error.response && error.response.status) {
                // console.log("error ==============> ", error.response.status);
                setData(prev => ({ ...prev, loginStatus: false }))
            }
        })
        
        return () => {
            console.log("cleanup")
        }
    },[])
    
    console.log()
    
    console.log(data);
    
    

    return (

        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>

<<<<<<< HEAD














=======
>>>>>>> b2c2665add4c871f4f646f9c2c9accc84ec03599
    )
}


export { UseGlobalState, UseGlobalStateUpdate, GlobalStateProvider }