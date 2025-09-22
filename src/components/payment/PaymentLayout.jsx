"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useGeolocation from "../../hooks/useGeolocation";
import { useGetPricingPlansQuery } from "../../redux/api/pricing/pricingApi";
import LoadingScreen from "../../resource/LoadingScreen";
import PaymentSummary from "./PaymentSummary";

export default function PaymentLayout({
  route,
  handleSubmit,
  isLoading,
  setTotalBill,
  plan,
  setPlan,
}) {
  const { data, isLoading: pricingLoading } = useGetPricingPlansQuery();
  const { location, isLoading: geoLoading } = useGeolocation();
  const [monthly, setMonthly] = useState("monthly");
  const params = useSearchParams();
  const subscription = params.get("subscription");
  const tenure = params.get("tenure");
  console.log({ location });

  const handleMonthly = (event) => {
    let { value } = event?.target;
    window.history.pushState(
      {},
      "",
      `${route}/?subscription=${subscription}&tenure=${value}`
    );

    setMonthly(value);
  };

  useEffect(() => {
    if (data) {
      const planData = data?.data.filter(
        (item) => item._id === subscription
      )[0];
      setPlan(planData);
      setMonthly(tenure);
    }
  }, [data, subscription, tenure]);

  if (pricingLoading || geoLoading) {
    return <LoadingScreen />;
  }

  return (
    <PaymentSummary
      plan={plan}
      monthly={monthly}
      setTotalBill={setTotalBill}
      handleMonthly={handleMonthly}
      isSubmitting={isLoading}
      onSubmit={handleSubmit}
      country={location}
    />
  );
}
