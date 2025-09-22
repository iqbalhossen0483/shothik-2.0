import { Button, Link, Stack } from "@mui/material";
import Navlink from "next/link";

export default function SideMenu() {
  return (
    <Stack flexDirection='column' sx={{ mt: 2, p: 1 }}>
      <Link component={Navlink} href='/tutorials'>
        <Button
          sx={{
            color: "primary.main",
            fontSize: "14px",
            textTransform: "none",
            p: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Tutorial series →
        </Button>
      </Link>
      <Link component={Navlink} href='/tutorials'>
        <Button
          sx={{
            color: "primary.main",
            fontSize: "14px",
            textTransform: "none",
            p: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Product tutorials →
        </Button>
      </Link>
      <Link component={Navlink} href='/paraphrase'>
        <Button
          sx={{
            color: "primary.main",
            fontSize: "14px",
            textTransform: "none",
            p: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Browse all tools →
        </Button>
      </Link>
    </Stack>
  );
}
