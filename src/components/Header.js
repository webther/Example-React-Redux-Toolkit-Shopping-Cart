import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NumericFormat } from "react-number-format"
import { recalculateCart } from "../stores/features/cart/cartSlice"

const Header = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(recalculateCart())
  }, [dispatch, cart.cartItems])

  return (
    <header>
      <NumericFormat value={ cart.totalAmount } displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={'2'} />
      <span className={'total-quantity'}>{ cart.totalQuantity }</span>
    </header>
  )
}

export default Header
