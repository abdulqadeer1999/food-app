import React from 'react'
import axios from "axios"
import { useGlobalState, useGlobalStateUpdate } from '../../../context/globalContext'
import Navbar from '../../Navbar/Navbar'
export default function CheckoutFrom() {
    const globalState = useGlobalState()
    globalState.cartData && globalState.cartData.cartItems.map(value => {
        delete value.price
        delete value._id
        delete value.image
        delete value.description
        delete value.stock
    })
    function placeOrder(e) {
        e.preventDefault()
        axios({
            method: 'post',
            url: "http://localhost:5000/order",
            data: {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                total: globalState.cartData.totalPrice,
                orders: globalState.cartData.cartItems
            },
            withCredentials: true
        }).then((response) => {
            if (response.data.status === 200) {
                console.log(response.data.message)
            }
            else {
                console.log(response.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <Navbar />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome {globalState.user.name} </h2>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form onSubmit={placeOrder}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Name" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Phone</label>
                                    <input type="text" className="form-control" id="phone" placeholder="Phone" required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Confirm Order</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}