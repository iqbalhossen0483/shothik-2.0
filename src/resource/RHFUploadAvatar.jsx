import { FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import UploadAvatar from "./UploadAvatar";

export function RHFUploadAvatar({ name, onDrop, helperText, loading }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <UploadAvatar
            error={!!error}
            file={field.value}
            onDrop={onDrop}
            helperText={helperText}
            loading={loading}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
