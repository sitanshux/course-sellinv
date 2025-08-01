import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Razorpay: Create Order
    createOrder: builder.mutation({
      query: ({ courseId }) => ({
        url: "/checkout/create-order",
        method: "POST",
        body: { courseId },
      }),
    }),

    // Razorpay: Verify Payment
    verifyPayment: builder.mutation({
      query: ({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }) => ({
        url: "/checkout/verify-payment",
        method: "POST",
        body: {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET"
      }),
    }),
    getPurchasedCourses: builder.query({
      query: (courseId) => ({
        url: `/`,
        method: "GET"
      })
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;






