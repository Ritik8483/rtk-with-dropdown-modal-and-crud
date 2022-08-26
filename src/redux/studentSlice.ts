import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentTypes } from "../components/types";

export const studentApi = createApi({
  reducerPath: "studentApi",
  tagTypes: ["addUSer"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/" }),
  endpoints: (builder) => ({
    allStudents: builder.query<StudentTypes[], void>({
      query: () => "/students",
      providesTags: ["addUSer"],
    }),
    addStudents: builder.mutation<void, StudentTypes>({
      query: (formValues) => ({
        url: "/students",
        method: "POST",
        body: formValues,
      }),
      invalidatesTags: ["addUSer"],
    }),
    deleteStudents: builder.mutation<void, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addUSer"],
    }),
    updateStudents:builder.mutation<void,StudentTypes>({
      query: ({id,...rest}) => ({
        url: `/students/${id}`,
        method: "PUT",
        body:rest
      }),
      invalidatesTags: ["addUSer"],
    }),
    singleViewUser: builder.query<StudentTypes, string>({
      query: (id) => `/students/${id}`,
      providesTags: ["addUSer"],
    }),
  }),
});

export const { useAllStudentsQuery, useAddStudentsMutation , useSingleViewUserQuery,useDeleteStudentsMutation,useUpdateStudentsMutation} = studentApi;
// export const {use} = studentApi
