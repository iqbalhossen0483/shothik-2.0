import { yupResolver } from "@hookform/resolvers/yup";
import { RemoveRedEyeRounded, VisibilityOffRounded } from "@mui/icons-material";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { trackEvent } from "../../analysers/eventTracker";
import { useLoginMutation } from "../../redux/api/auth/authApi";
import {
  setShowForgotPasswordModal,
  setShowLoginModal,
  setShowRegisterModal,
} from "../../redux/slice/auth";
import FormProvider from "../../resource/FormProvider";
import RHFTextField from "../../resource/RHFTextField";

// ----------------------------------------------------------------------

export default function AuthLoginForm({ loading, setLoading }) {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      trackEvent("click", "auth", "login-button", 1);

      let payload = {
        email: data.email,
        auth_type: "manual",
        password: data.password,
      };

      const res = await login(payload);
      if (res?.data) {
        dispatch(setShowRegisterModal(false));
        dispatch(setShowLoginModal(false));
      }
    } catch (error) {
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {isError && <Alert severity='error'>{error?.data?.message}</Alert>}

        <RHFTextField name='email' label='Email address' size='small' />

        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? "text" : "password"}
          size='small'
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
      </Stack>

      <Stack alignItems='flex-end'>
        <Button
          onClick={() => {
            dispatch(setShowForgotPasswordModal(true));
          }}
          variant='body2'
          color={theme.palette.primary.main}
          fontWeight={600}
        >
          Forgot password?
        </Button>
      </Stack>

      <Button
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={loading || isLoading}
      >
        Login
      </Button>
    </FormProvider>
  );
}
