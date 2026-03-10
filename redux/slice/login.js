import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"Login",
    initialState:{
        email: "aditya@gmail.com",
        password: "pass123",
      },
    reducers:{
        updatePassword:(state , action)=>{
            state.password = action.payload
        }
    }
    
})

export const {updatePassword} = loginSlice.actions
export default loginSlice.reducer