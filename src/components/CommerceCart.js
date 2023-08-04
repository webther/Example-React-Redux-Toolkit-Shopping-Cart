import React, {useEffect} from "react"
import { NumericFormat } from "react-number-format"
import { useDispatch, useSelector } from "react-redux"
import { removeItemByPid, increaseQuantityByPid, decreaseQuantityByPid, recalculateCart } from "../stores/features/cart/cartSlice"
import { increaseInventoryByPid, decreaseInventoryByPid } from "../stores/features/product/productSlice";

const CommerceCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(recalculateCart())
  }, [dispatch, cart.cartItems])

  return (
    <div className="commerce-cart">
      <h3>Cart</h3>
      {cart.cartItems.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="col-price">Price</th>
              <th className="col-quantity">Quantity</th>
              <th className="col-price">Total</th>
              <th className="col-action"></th>
            </tr>
          </thead>

          <tbody>
            {cart.cartItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{ item.title }</td>
                  <td className="col-price">
                    <NumericFormat value={ item.price } displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={'2'}/>
                  </td>
                  <td className="col-quantity">
                    <button
                      disabled={item.quantity >= item.inventory}
                      onClick={()=> {
                        dispatch(increaseQuantityByPid({ pid: item.pid }))
                        dispatch(decreaseInventoryByPid({ pid: item.pid }))
                      }}
                    >+</button>
                    { item.quantity }
                    <button
                      disabled={item.quantity <= 0}
                      onClick={()=> {
                        dispatch(decreaseQuantityByPid({ pid: item.pid }))
                        dispatch(increaseInventoryByPid({ pid: item.pid }))
                      }}
                    >-</button>
                  </td>
                  <td className="col-price">
                    <NumericFormat value={ (item.price * item.quantity).toFixed(2) } displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={'2'} />
                  </td>
                  <td className="col-action">
                    <button
                      onClick={() => {
                        dispatch(removeItemByPid({ pid: item.pid }))
                        dispatch(increaseInventoryByPid({ pid: item.pid, quantity: item.quantity }))
                      }}
                    >x</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <strong>Total: </strong>
                <NumericFormat value={ cart.totalAmount } displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={'2'} />
              </td>
            </tr>
          </tfoot>
        </table>
        ) : 'Your shopping cart is empty.'
      }
    </div>
  )
}

export default CommerceCart
