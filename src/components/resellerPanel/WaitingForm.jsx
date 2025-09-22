"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import { Box, Button, InputAdornment } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useAffiliateMutation } from "../../redux/api/auth/authApi";
import RHFTextField from "../../resource/RHFTextField";

export default function WaitlistForm({ userType }) {
  const enqueueSnackbar = useSnackbar();
  const [affiliate] = useAffiliateMutation();

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const defaultValues = {
    name: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        userType,
      };

      await affiliate(payload).unwrap();

      enqueueSnackbar(`Submitted successfully!`);
      reset();
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Sorry, an unexpected error occurred.";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "450px" },
            margin: "0 auto",
          }}
        >
          <RHFTextField
            name='name'
            placeholder='Full Name'
            startAdornment={
              <InputAdornment position='start'>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                  }}
                >
                  <PersonOutlineSharpIcon />
                </Box>
              </InputAdornment>
            }
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            sx={{
              width: "100%",
              mb: 2,
            }}
          />
          <RHFTextField
            name='email'
            placeholder='Email'
            startAdornment={
              <InputAdornment position='start'>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                  }}
                >
                  <MailOutlineIcon />
                </Box>
              </InputAdornment>
            }
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            sx={{
              width: "100%",
              mb: 2,
            }}
          />
          <Button
            variant='contained'
            size='large'
            type='submit'
            disabled={isSubmitting}
            sx={{
              width: "100%",
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            Join the waitlist
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}
