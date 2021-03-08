import React, { useState, useEffect } from "react";
import Basket from './cart/Basket';
// import products from './data';
import products from '../cart/cart/Basket'
import Navbar from '../../Navbar/Nav'
import BaseUrl from '../../../baseUrl/BaseUrl'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { UseGlobalState, UseGlobalStateUpdate } from '../../../context/GlobalContext'

function Dashboard() {
    const globalState = UseGlobalState()
    const globalStateUpdate = UseGlobalStateUpdate()
    let history = useHistory()
    const [hideCart, setHideCart] = useState(true)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/getProducts',
            withCredentials: true
        }).then((response) => {
            // console.log(response.data.data)
            setProducts(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    console.log(products)
    const onAdd = (product) => {
        console.log(cartItems)

        const exist = cartItems.find((x) => x._id === product._id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
                )
            );

        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
  

    const onRemove = (product) => {
        const exist = cartItems.find((x) => x._id === product._id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x._id !== product._id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };
   

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
    return (
        <div>
            <Navbar logout={logout} setCart={setHideCart} cartItemsLength={cartItems.length} />
            <div className='bg-primary py-2'>
                <div className="container">
                    <h2 className="mr-4 text-white">Welcome {globalState.user.name} </h2>
                </div>
            </div>
            <div className="row1">
                {hideCart === true ?
                    <main className="container">
                        <h1 className="text-center mt-5 ">Products</h1>
                        <div className="row">
                            {products.map((product) => (
                                <div className="col-md-4 mt-5" key={product.id}>
                                    <div>
                                        <img className="w-100" height="200" src={product.image} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <div>PKR: {product.price}/- Per kg</div>
                                        <div>
                                            <button onClick={() => onAdd(product)} className="btn btn-primary">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main> :
                    <>
                        <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} /></>}
            </div>
        </div>
    )
}

export default Dashboard