"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import useSnackbar from "../../hooks/useSnackbar";
import { useContactMutation } from "../../redux/api/auth/authApi";
import FormProvider from "../../resource/FormProvider";
import RHFTextField from "../../resource/RHFTextField";

export default function ContactForm() {
  const enqueueSnackbar = useSnackbar();
  const [contact] = useContactMutation();

  const contactSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  const defaultValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const methods = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await contact(data).unwrap();

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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <Typography
          component={motion.p}
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          variant='h3'
        >
          Feel free to contact us. We'll be glad to hear from you, buddy.
        </Typography>

        <Stack
          component={motion.div}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          spacing={3}
        >
          <RHFTextField fullWidth label='Your name' name='name' />
          <RHFTextField fullWidth label='Your e-mail address' name='email' />
          <RHFTextField fullWidth label='Subject' name='subject' />

          <RHFTextField
            fullWidth
            label='Enter your message here.'
            multiline
            rows={4}
            name='message'
          />
        </Stack>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            type='submit'
            size='large'
            variant='contained'
            loading={isSubmitting}
          >
            Submit Now
          </Button>
        </motion.div>
      </Stack>
    </FormProvider>
  );
}
