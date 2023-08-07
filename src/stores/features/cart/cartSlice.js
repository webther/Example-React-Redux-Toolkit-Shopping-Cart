import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    addItemByProduct: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => {
        return item.pid === action.payload.pid
      })

      if (cartItemIndex !== -1) {
        state.cartItems[cartItemIndex].quantity++
      }
      else {
        state.cartItems.push({
          ...action.payload,
          ...{ quantity: 1 }
        })
      }
    },
    removeItemByPid: (state, action) => {
      const cartItem = state.cartItems.find(item => item.pid === action.payload.pid)
      if (cartItem) {
        state.cartItems.splice(state.cartItems.indexOf(cartItem), 1)
      }
    },
    increaseQuantityByPid: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => {
        return item.pid === action.payload.pid
      })

      if (cartItemIndex !== -1) {
        state.cartItems[cartItemIndex].quantity += action.payload.quantity ?? 1
      }
    },
    decreaseQuantityByPid: (state, action) => {
      const cartItemIndex = state.cartItems.findIndex((item) => {
        return item.pid === action.payload.pid
      })

      if (cartItemIndex !== -1) {
        state.cartItems[cartItemIndex].quantity -= action.payload.quantity ?? 1
      }
    },
    recalculateCart: (state) => {
      let totalAmount = 0
      let totalQuantity = 0
      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.quantity
        totalQuantity += item.quantity
      })

      state.totalAmount = totalAmount.toFixed(2)
      state.totalQuantity = totalQuantity
    }
  }
})

export const { addItemByProduct, removeItemByPid, increaseQuantityByPid, decreaseQuantityByPid, recalculateCart } = cartSlice.actions

export default cartSlice.reducer
