import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "../features/api/purchaseApi";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function BuyCourseButton({ courseId }) {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const purchaseCourseHandler = async () => {
    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      toast.error("Failed to load Razorpay script.");
      return;
    }

    const res = await createOrder({ courseId });
    const orderData = res?.data;

    if (!orderData || !orderData.orderId) {
      toast.error("Failed to create Razorpay order.");
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your LMS Name",
      description: "Course Purchase",
      order_id: orderData.orderId,
      handler: async function (response) {
        const verifyRes = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verifyRes?.data?.success) {
          toast.success("Payment successful! You’re now enrolled.");
          window.location.reload(); // or navigate to course page
        } else {
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: "Student Name", // Optional
        email: "student@example.com", // Optional
      },
      theme: {
        color: "#6366F1",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <Button onClick={purchaseCourseHandler} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase course"
      )}
    </Button>
  );
}

export default BuyCourseButton;



























