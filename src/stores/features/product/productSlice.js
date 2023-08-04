import { createSlice } from "@reduxjs/toolkit"

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [
      { pid: 1, title: "iPhone 14 Pro", price: 1499.99, inventory: 2 },
      { pid: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 14 },
      { pid: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 },
      { pid: 4, title: "Google Pixel 3", price: 799.99, inventory: 6 }
    ]
  },
  reducers: {
    increaseInventoryByPid: (state, action) => {
      const productIndex = state.products.findIndex((product) => {
        return product.pid === action.payload.pid
      })

      if (productIndex !== -1) {
        state.products[productIndex].inventory += action.payload.quantity ?? 1
      }
    },
    decreaseInventoryByPid: (state, action) => {
      const productIndex = state.products.findIndex((product) => {
        return product.pid === action.payload.pid
      })

      if (productIndex !== -1) {
        state.products[productIndex].inventory -= action.payload.quantity ?? 1
      }
    }
  }
})

export const { increaseInventoryByPid, decreaseInventoryByPid } = productSlice.actions

export default productSlice.reducer
