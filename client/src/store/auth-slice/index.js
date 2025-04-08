import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};



const authslice = createSlice({
    name:'auth',
    initialState,
    reducers :{
        setUser: (state,action)=>{

        }
    }
})

export const {setUser} = authslice.actions;
export default authslice.reducer