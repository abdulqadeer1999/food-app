import React, { useEffect, useState } from "react";
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalContext'
function AdminDashboard() {
    let [orderData, setOrderData] = useState([])
    const globalStateUpdate = useGlobalStateUpdate()
    let history = useHistory()
    function logout() {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logout',
            withCredentials: true
        }).then((response) => {
            console.log(response)
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
                role: null
            }))
            history.push("/login")

        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getOrders',
            withCredentials: true
        }).then((response) => {
            console.log(response.data.data)
            setOrderData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log("Order data", orderData)
    return (
        <div>
            <Navbar logout={logout} />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome admin</h2>
                </div>
            </div>
            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Products Name</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {
                        orderData.map((value, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value.name}</td>
                                        <td>{value.address}</td>
                                        <td>{value.phone}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Orders
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        {
                                                            value.orders.map((v, i) => {
                                                                return <a className="dropdown-item" href="#">{v.name} {v.qty}</a>
                                                            })
                                                        }
                                                    </div>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default AdminDashboard