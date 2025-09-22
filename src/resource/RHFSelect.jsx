import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export function RHFSelect({
  name,
  native,
  children,
  helperText,
  maxHeight = 220,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          slotProps={{
            select: {
              native: native || false,
              MenuProps: {
                PaperProps: {
                  sx: {
                    ...(!native && {
                      px: 1,
                      maxHeight:
                        typeof maxHeight === "number" ? maxHeight : "unset",
                      "& .MuiMenuItem-root": {
                        px: 1,
                        borderRadius: 0.75,
                        typography: "body2",
                        textTransform: "capitalize",
                      },
                    }),
                  },
                },
              },
              sx: { textTransform: "capitalize" },
            },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
