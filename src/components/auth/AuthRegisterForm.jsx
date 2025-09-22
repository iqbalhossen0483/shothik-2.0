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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { trackEvent } from "../../analysers/eventTracker";
import { useRegisterMutation } from "../../redux/api/auth/authApi";
import {
  setIsNewRegistered,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";
import FormProvider from "../../resource/FormProvider";
import RHFTextField from "../../resource/RHFTextField";

// Common Password List
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

// ----------------------------------------------------------------------

export default function AuthRegisterForm({ country, loading }) {
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  // Validation schema
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(20, "First name must not exceed 20 characters")
      .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters")
      .required("First name required"),
    lastName: Yup.string()
      .trim()
      .min(2, "Last name must be at least 3 characters")
      .max(20, "Last name must not exceed 20 characters")
      .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters")
      .required("Last name required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      trackEvent("click", "auth", "sign-up-button", 1);

      let payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        auth_type: "manual",
        password: data.password,
        country: country,
      };
      const res = await register(payload);
      if (res?.data) {
        dispatch(setShowRegisterModal(false));
        dispatch(setShowLoginModal(false));
        dispatch(setIsNewRegistered(true));
      }
    } catch (error) {
      reset();
      setError("afterSubmit", { message: error.message || error });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {/* After submit error */}
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}
        {/* Server error */}
        {isError && <Alert severity='error'>{error?.data?.message}</Alert>}

        {/* Form fields */}
        <RHFTextField name='firstName' label='First name' size='small' />
        <RHFTextField name='lastName' label='Last name' size='small' />
        <RHFTextField name='email' label='Email address' size='small' />
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

        {/* Password validation feedback */}
        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {methods.watch("password").length >= 6 ? (
              <Image src='/green_tick.svg' width={20} height={20} alt='Valid' />
            ) : (
              <Image
                src='/gray_tick.svg'
                width={20}
                height={20}
                alt='Invalid'
              />
            )}
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              Must be at least 8 characters
            </Typography>
          </Box>
        </Stack>

        {/* Submit button */}
        <Button
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading || loading}
        >
          Create account --
        </Button>
      </Stack>
    </FormProvider>
  );
}
