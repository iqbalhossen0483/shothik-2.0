import { AddAPhotoRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function UploadAvatar({
  error,
  file,
  onDrop,
  helperText,
  loading,
}) {
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(selectedFile);
      onDrop(selectedFile);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 144,
          height: 144,
          margin: "auto",
          display: "flex",
          cursor: loading ? "not-allowed" : "pointer",
          overflow: "hidden",
          borderRadius: "50%",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
          border: `1px dashed ${error ? "red" : "#ccc"}`,
          backgroundColor: error ? "#ffeeee" : "#f9f9f9",
        }}
        onClick={() =>
          !loading && document.getElementById("avatarInput").click()
        }
      >
        <input
          id='avatarInput'
          type='file'
          accept='image/*'
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={loading}
        />

        {file ? (
          <Image
            alt='avatar'
            src={file}
            width={144}
            height={144}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              position: "absolute",
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AddAPhotoRounded sx={{ mb: 1, color: "gray" }} />
            <Typography variant='caption'>Upload Photo</Typography>
          </Box>
        )}
      </Box>

      {helperText && (
        <Typography
          variant='caption'
          color='error'
          sx={{ textAlign: "center", mt: 1 }}
        >
          {helperText}
        </Typography>
      )}
    </>
  );
}
