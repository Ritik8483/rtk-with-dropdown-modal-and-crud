import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StudentTypes } from "../components/types";

export const studentApi = createApi({
  reducerPath: "studentApi",
  tagTypes: ["addUSer"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005/" }),
  endpoints: (builder) => ({
    allStudents: builder.query<StudentTypes[], any>({
      query: (params) =>
        `/students?&name_like=${params.searchValue}&_sort=id&_order=${params.orderType}&_start=${params.initialEntry}&_end=${params.finalEntry}`,
      providesTags: ["addUSer"],
    }),
    totalNumberOfStudents: builder.query<any, any>({
      query: (data:any) => "/students",
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
    updateStudents: builder.mutation<void, StudentTypes>({
      query: ({ id, ...rest }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["addUSer"],
    }),
    singleViewUser: builder.query<StudentTypes, string>({
      query: (id) => `/students/${id}`,
      providesTags: ["addUSer"],
    }),
  }),
});

export const {
  useAllStudentsQuery,
  useTotalNumberOfStudentsQuery,
  useAddStudentsMutation,
  useSingleViewUserQuery,
  useDeleteStudentsMutation,
  useUpdateStudentsMutation,
} = studentApi;
// export const {use} = studentApi
