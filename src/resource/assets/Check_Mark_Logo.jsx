import { Box, Link } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

const ShothikCheckMark = forwardRef((_, ref) => {
  const logo = (
    <Box
      ref={ref}
      component='div'
      sx={{
        width: { xs: 100, sm: 100, md: 100, lg: 150 },
        height: "auto",
      }}
    >
      <Image
        src='/moscot.png'
        priority
        alt='shothik_logo'
        width={100}
        height={40}
        style={{
          width: "50%",
          height: "auto",
          margin: "0 auto",
        }}
      />
    </Box>
  );

  return (
    <Link
      component={NextLink}
      href='/?utm_source=internal'
      sx={{ display: "contents" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          margin: "10px 2px",
        }}
      >
        {logo}
      </div>
    </Link>
  );
});

export default ShothikCheckMark;
