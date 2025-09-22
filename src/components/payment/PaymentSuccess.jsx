"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTokenQuery } from "../../redux/api/auth/authApi";
import { updateUser } from "../../redux/slice/auth";

const PaymentSuccessAndUpdateUser = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { data } = useGetTokenQuery({ skip: !accessToken });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateUser(data));
    }
  }, [data]);

  return null;
};

export default PaymentSuccessAndUpdateUser;
