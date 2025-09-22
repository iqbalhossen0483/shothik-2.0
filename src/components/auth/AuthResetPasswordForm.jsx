"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useForgotPasswordMutation } from "../../redux/api/auth/authApi";
import { setShowLoginModal } from "../../redux/slice/auth";
import FormProvider from "../../resource/FormProvider";
import RHFTextField from "../../resource/RHFTextField";

// ----------------------------------------------------------------------

export default function AuthResetPasswordForm() {
  const enqueueSnackbar = useSnackbar();
  const [forgotPassword] = useForgotPasswordMutation();
  const [isSentMail, setIsSentMail] = useState(false);
  const dispatch = useDispatch();

  const ForgotSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(ForgotSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let payload = {
      email: data.email,
    };

    try {
      const result = await forgotPassword(payload);
      if (result.data.success) {
        dispatch(setShowLoginModal(false));
        enqueueSnackbar(
          "Reset password link sent to your email. Please check."
        );
      }
    } catch (error) {
      console.error(error);

      reset();

      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    } finally {
      setIsSentMail(true);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name='email' label='Email address' />

      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
        sx={{ mt: 3 }}
      >
        {isSentMail ? "Resend" : "Send"} Request
      </Button>
    </FormProvider>
  );
}
