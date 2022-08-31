import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const AuthStudentApi = createApi({
    reducerPath: 'AuthStudentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://testtourapp.herokuapp.com/' }),
    endpoints: (builder) => ({
        loginStudentApi:builder.mutation({
            query:(credentials)=>{
                return{
                    url:'/users/signin',
                    method:'POST',
                    body:credentials
                }
            }
        }),
        registerStudentApi:builder.mutation({
            query:(credentials)=>{
                return{
                    url:'/users/signup',
                    method:'POST',
                    body:credentials
                }
            }
        }),
      }),
})
export const {useLoginStudentApiMutation,useRegisterStudentApiMutation}=AuthStudentApi;
export default AuthStudentApi;