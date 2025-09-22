import { Box } from "@mui/material";

const ViewInputInOutAsDemo = ({ input }) => {
  const plainText = input.replace(/<[^>]+>/g, "");

  return (
    <Box
      sx={{
        opacity: 0.5,
        width: "100%",
        height: "92%",
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        paddingX: 2,
      }}
    >
      <p>{plainText}</p>
    </Box>
  );
};

export default ViewInputInOutAsDemo;
