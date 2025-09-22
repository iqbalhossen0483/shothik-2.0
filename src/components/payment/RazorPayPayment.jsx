"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PAYMENT } from "../../config/config/route";
import useSnackbar from "../../hooks/useSnackbar";
import { useRazorPaymentMutation } from "../../redux/api/pricing/pricingApi";
import PaymentLayout from "./PaymentLayout";

export default function RazorPayPayment() {
  return (
    <Suspense fallback={null}>
      <RazorPayPaymentComponent />
    </Suspense>
  );
}

function RazorPayPaymentComponent() {
  const [razorPayment, { isLoading }] = useRazorPaymentMutation();
  const { user } = useSelector((state) => state.auth);
  const [totalBill, setTotalBill] = useState(0);
  const enqueueSnackbar = useSnackbar();
  const [plan, setPlan] = useState({});
  const params = useSearchParams();
  const tenure = params.get("tenure");
  const router = useRouter();

  useEffect(() => {
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const payload = {
        pricingId: plan?._id,
        amount: totalBill,
        payment_type: tenure,
      };
      const res = await razorPayment(payload).unwrap();
      const order = res.data;
      if (order) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZOR_KEY,
          amount: order.amount * 100,
          currency: "INR",
          name: "Shothik AI",
          description: "Payment for Shothik AI",
          order_id: order.id,
          handler: (res) => {
            router.push(order.notes.success_url);
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.phone,
          },
          theme: {
            color: "#007B55",
          },
          modal: {
            ondismiss: () => {
              router.push(order.notes.failed_url);
            },
          },
        };

        if (typeof Razorpay !== "undefined") {
          const rzp = new Razorpay(options);
          rzp.open();
        } else {
          enqueueSnackbar(
            "Razorpay SDK failed to load. Please refresh and try again.",
            {
              variant: "error",
            }
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      enqueueSnackbar("Payment failed. Please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    <Suspense fallback={null}>
      <PaymentLayout
        setTotalBill={setTotalBill}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        route={PAYMENT.razor}
        plan={plan}
        setPlan={setPlan}
      />
    </Suspense>
  );
}
