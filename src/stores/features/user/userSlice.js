import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Unknown',
    age: 0,
    email: ''
  },
  reducers: {
    login: (state, action) => {
      state = action.payload
    }
  }
})

export default userSlice.reducer
