import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export function LeftIcon() {
  return (
    <ChevronLeft
      sx={{
        width: 20,
        height: 20,
      }}
    />
  );
}

export function RightIcon() {
  return (
    <ChevronRight
      sx={{
        width: 20,
        height: 20,
      }}
    />
  );
}
