import { configureStore } from "@reduxjs/toolkit";
import AuthStudentApi from "../redux/AuthStudentApi";
import { studentApi } from "../redux/studentSlice";
import authApiReducer from '../redux/AuthApiSlice';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store=configureStore({
    reducer:{
        auth:authApiReducer,
        [AuthStudentApi.reducerPath]:AuthStudentApi.reducer,
        [studentApi.reducerPath]: studentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware).concat(AuthStudentApi.middleware),
});

setupListeners(store.dispatch);
export default store;