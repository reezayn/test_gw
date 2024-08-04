import { createSlice } from '@reduxjs/toolkit'

export interface UserAuthState {
  status: boolean
  userData: any
}

const initialState: UserAuthState = {
  status: false,
  userData: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Login in authSlice reached')
      state.status = true
      state.userData = action.payload
    },
    logout: (state) => {
      console.log('Logout of authSlice reached')
      state.status = false
      state.userData = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
