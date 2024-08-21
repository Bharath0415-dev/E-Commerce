import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../../assets/cart_cross_icon.png'

function CartItems() {

    const{all_product,cartItems,removeFromCart,getTotalCartAmount,getTotalTax}=useContext(ShopContext)
  return (
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>

        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                    <div className="cartitems-format-main cartitem-format ">
                        <img src={e.image} alt="" className='carticon-product-icon'/>
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon'src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>$ {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Tax {'(18%)'}</p>
                        <p>$ {getTotalTax()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Total</p>
                        <p>$ {getTotalCartAmount() + getTotalTax()}</p>
                    </div>
                </div>
                <button>Proceed to Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promocode, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo Code'/>
                    <button>Apply</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems