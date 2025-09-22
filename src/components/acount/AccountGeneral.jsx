import { yupResolver } from "@hookform/resolvers/yup";
import { CheckCircle, ErrorRounded, Info } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid2,
  InputAdornment,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { countries } from "../../_mock/countries";
import useResponsive from "../../hooks/useResponsive";
import useSnackbar from "../../hooks/useSnackbar";
import {
  useUpdateProfileMutation,
  useUploadImageMutation,
} from "../../redux/api/auth/authApi";
import { getUser, setUser } from "../../redux/slice/auth";
import FormProvider from "../../resource/FormProvider";
import { RHFSelect } from "../../resource/RHFSelect";
import RHFTextField from "../../resource/RHFTextField";
import { RHFUploadAvatar } from "../../resource/RHFUploadAvatar";
// ----------------------------------------------------------------------

export const Label = ({
  children,
  color = "default",
  fontColor = "white",
  startIcon,
  sx,
}) => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={0.5}
      sx={{
        backgroundColor: color,
        color: fontColor,
        px: 1.5,
        py: 0.5,
        borderRadius: 1.5,
        ...sx,
      }}
    >
      {startIcon}
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{children}</Typography>
    </Stack>
  );
};

export default function AccountGeneral({ user }) {
  const enqueueSnackbar = useSnackbar();
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadImage] = useUploadImageMutation();
  const isMobile = useResponsive("down", "sm");
  const dispatch = useDispatch();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain alphabetic characters, spaces, hyphens, and apostrophes."
      )
      .min(3, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    country: Yup.string(),
    address: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    zipCode: Yup.number().nullable(),
  });

  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || null,
    country: user?.country || "Bangladesh",
    address: user?.address || "",
    state: user?.state || "",
    city: user?.city || "",
    zipCode: user?.zipCode || null,
  };
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await updateProfile(data);
      if (res?.data?.message === "Profile updated") {
        enqueueSnackbar("Your profile has been updated successfully!");
        dispatch(setUser(res.data.data));
      }
    } catch (error) {
      enqueueSnackbar(error.message || "Failed to update your profile.", {
        variant: "error",
      });
    }
  };

  const handleDrop = async (acceptedFiles) => {
    setLoading(true);
    try {
      setValue("image", null);
      const file = acceptedFiles;

      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData).unwrap();

      await updateProfile({ ...defaultValues, image: response?.image });
      if (response?.image) {
        dispatch(getUser({ ...user, image: response?.image }));
        setValue("image", response.image, { shouldValidate: true });
        enqueueSnackbar("Your profile picture has been updated successfully!");
      } else {
        handleImageUploadError();
      }
    } catch (error) {
      console.log(error);
      handleImageUploadError(error);
    }
    setLoading(false);
  };

  const handleImageUploadError = (error) => {
    setValue("image", user?.image, { shouldValidate: true });
    const errorMessage = error?.message || "Failed to upload image";
    enqueueSnackbar(errorMessage, { variant: "error" });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            {loading ? (
              <Stack alignItems='center' height={180}>
                <Skeleton
                  variant='circular'
                  width={isMobile ? 126 : 144}
                  height={isMobile ? 126 : 144}
                />
              </Stack>
            ) : (
              <RHFUploadAvatar
                name='image'
                onDrop={handleDrop}
                loading={loading}
                helperText={
                  <Typography
                    variant='caption'
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            )}
          </Card>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Stack gap={3}>
              <Stack direction='row' gap={2}>
                <RHFTextField name='name' label='Name' />

                <RHFTextField
                  name='email'
                  label='Email Address'
                  helperText={
                    <Stack direction='row' gap={1}>
                      <Info fontSize='small' /> Email can not be changed after
                      sign up.
                    </Stack>
                  }
                  endAdornment={
                    <InputAdornment position='end'>
                      {user?.is_verified ? (
                        <Label
                          color='primary.main'
                          startIcon={<CheckCircle sx={{ fontSize: 16 }} />}
                        >
                          Verified
                        </Label>
                      ) : (
                        <Label
                          color='error.main'
                          startIcon={<ErrorRounded sx={{ fontSize: 16 }} />}
                        >
                          Unverified
                        </Label>
                      )}
                    </InputAdornment>
                  }
                  readOnly={true}
                />
              </Stack>
              <RHFTextField name='address' label='Address' multiline rows={2} />
              <Box
                rowGap={3}
                columnGap={2}
                display='grid'
                gridTemplateColumns={{
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                }}
              >
                <RHFSelect
                  native
                  name='country'
                  label='Country'
                  placeholder='Country'
                  onChange={(e) => setValue("country", e.target.value)}
                >
                  <option value='' disabled>
                    Select a country
                  </option>
                  {countries.map(({ code, label }) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </RHFSelect>

                <RHFTextField
                  name='state'
                  placeholder='Please enter your state or region'
                />

                <RHFTextField
                  name='city'
                  placeholder='Please enter your city'
                />

                <RHFTextField
                  name='zipCode'
                  placeholder='Please enter your zip code'
                />
              </Box>
            </Stack>

            <Stack spacing={3} alignItems='flex-end' sx={{ mt: 3 }}>
              <Button type='submit' variant='contained' loading={isSubmitting}>
                Save Changes
              </Button>
            </Stack>
          </Card>
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}
