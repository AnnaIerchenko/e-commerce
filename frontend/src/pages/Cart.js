import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Store } from '../Store'

import '../styles/cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const Cart = () => {
  const navigate = useNavigate()

  const { state, dispatch: ctxDispatch } = useContext(Store)
  
  const {
    cart: { cartItems},
  } = state;

  const updateCartHandler = async(item, quantity)=> {
    const {data} = await axios.get(`/api/products/slug/${item.slug}`)
    if(data.countInStock < quantity) {
      window.alert('Sorry.Product is out of Stock!')
      return;
    }
    ctxDispatch ({
      type: 'CART_ADD_ITEM', 
      payload: {...item, quantity}
    })

  }

  const removeItemHandler = (item) => {
    ctxDispatch ({
      type: 'CART_REMOVE_ITEM', 
      payload: item
    })

  }

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }
  return (
    <>
      <Navbar />
        <div className="cart-container">
          <div className="cart-row">
            <h2 className="cart-title">Shopping Cart</h2>
          </div>
          <div className="cart-row">
            <div className="cart-col">
              {cartItems.length === 0 ? (<h3 className='info'>Cart is empty <Link to='/shop'>Go Shopping</Link></h3>)
              : (
                <div className='cart-cards'>
                  {cartItems.map((item) => (
                    <div className='cart-card' key={item._id}>
                      <div className="cart-header">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cart-body">
                        <Link to={`/product/${item.slug}`}>{item.title}</Link>
                        <div className='buttons'>
                          <button onClick={() => updateCartHandler(item, item.quantity - 1)} disabled={item.quantity === 1}><FontAwesomeIcon icon={faMinusCircle}/></button>
                            <span className='cart-quantity'>{item.quantity}</span>
                          <button onClick={() => updateCartHandler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}><FontAwesomeIcon icon={faPlusCircle}/></button>
                        </div>
                      </div>
                      <div className="cart-footer">
                        <span className='cart-price'>${item.price}</span>
                        <button onClick={() => removeItemHandler(item)}><FontAwesomeIcon icon={faTrashAlt}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              ) }
            </div>
            <div className="cart-col">
              <div className="checkout-card">
                <div className="checkout-body">
                  <h1 className="checkout-title">
                    Subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)}{ ' '} 
                    items) : $
                    {cartItems.reduce((a,c) => a = c.price * c.quantity, 0)}
                  </h1>
                </div>
                <div className="checkout-footer">
                  <button onClick={checkoutHandler} className="checkout-btn" type='button' disabled={cartItems.length === 0}>
                    proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      <Footer />
    </>
  )
}

export default Cart