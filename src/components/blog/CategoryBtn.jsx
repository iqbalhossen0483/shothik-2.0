import { Button } from "@mui/material";

export default function CategoryBtn({
  category,
  selectedCategory,
  handleCategoryClick,
}) {
  const isSelected = selectedCategory === category._id;
  return (
    <Button
      key={category._id}
      sx={{
        color: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.7)"
            : "rgba(0,0,0,0.87)",
        display: "block",
        width: "100%",
        textAlign: "left",
        p: 1,
        m: 0,
        ...(isSelected && {
          backgroundColor: "primary.light",
          color: "rgba(255,255,255,0.9)",
        }),
        ":hover": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.08)"
              : "rgba(0,0,0,0.04)",
          textDecoration: "none",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.7)"
              : "rgba(0,0,0,0.87)", // Adjusted hover color for light mode
        },
      }}
      onClick={() => handleCategoryClick(category)}
    >
      {category.title}
    </Button>
  );
}
