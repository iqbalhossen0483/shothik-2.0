"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useResetPasswordMutation } from "../../redux/api/auth/authApi";
import FormProvider from "../../resource/FormProvider";
import RHFTextField from "../../resource/RHFTextField";

// ----------------------------------------------------------------------
const commonPasswords = [
  "password",
  "123456",
  "12345678",
  "admin",
  "welcome",
  "qwerty",
  "letmein",
  "football",
  "iloveyou",
  "abc123",
  "monkey",
  "123123",
  "sunshine",
  "princess",
  "dragon",
];

export default function AuthForgotPasswordForm() {
  const { push } = useRouter();
  const { token } = useParams();
  const enqueueSnackbar = useSnackbar();
  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 6 characters long")
      .max(20, "Password must not exceed 20 characters")
      .notOneOf(
        commonPasswords,
        "This password is too common. Please choose a stronger one."
      )
      .required("Password is required"),
  });

  const defaultValues = {
    key: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(ResetSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const password = watch().password;

  const onSubmit = async (data) => {
    let payload = {
      key: token,
      password: data.password,
    };

    try {
      const result = await resetPassword(payload);
      if (result.data) {
        enqueueSnackbar("Update success! Please login");
        push("/auth/login");
      }
    } catch (error) {
      console.error(error);

      reset();

      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        {isError && <Alert severity='error'>{error?.data?.message}</Alert>}
        <RHFTextField
          name='password'
          label='Password'
          size='small'
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? (
                    <RemoveRedEyeRounded />
                  ) : (
                    <VisibilityOffRounded />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {password.length >= 6 ? (
              <Image alt='valid' src='/green_tick.svg' width={20} height={20} />
            ) : (
              <Image
                alt='invalid'
                src='/gray_tick.svg'
                width={20}
                height={20}
              />
            )}
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              Must be at least 6 characters
            </Typography>
          </Box>
        </Stack>

        <Button
          fullWidth
          color='inherit'
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
          sx={{
            height: "44px",
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "& .css-11d3pii-MuiLoadingButton-loadingIndicator, & .css-8balfn": {
              color: "white",
            },
          }}
        >
          Update Password
        </Button>
      </Stack>
    </FormProvider>
  );
}
