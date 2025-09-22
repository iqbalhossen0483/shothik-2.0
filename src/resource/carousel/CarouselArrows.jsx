import { IconButton, Stack } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { LeftIcon, RightIcon } from "./Icon";

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) =>
    prop !== "filled" && prop !== "hasChildren" && prop !== "shape",
})(({ filled, shape, hasChildren, theme }) => ({
  color: "inherit",
  transition: theme.transitions.create("all", {
    duration: theme.transitions.duration.shorter,
  }),
  ...(shape === "rounded" && {
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
  }),
  ...(!filled && {
    opacity: 0.48,
    "&:hover": {
      opacity: 1,
    },
  }),
  ...(filled && {
    color: alpha(theme.palette.common.white, 0.8),
    backgroundColor: alpha(theme.palette.grey[900], 0.48),
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
    },
  }),
  ...(hasChildren && {
    zIndex: 9,
    top: "50%",
    position: "absolute",
    marginTop: theme.spacing(-2.5),
  }),
}));

export default function CarouselArrows({
  shape = "circular",
  filled = false,
  onNext,
  onPrevious,
  children,
  leftButtonProps,
  rightButtonProps,
  sx,
  ...other
}) {
  return (
    <Stack sx={sx} {...other}>
      <StyledIconButton
        filled={filled}
        shape={shape}
        hasChildren={!!children}
        onClick={onPrevious}
        {...leftButtonProps}
        sx={{
          left: 16,
          ...leftButtonProps?.sx,
        }}
      >
        <LeftIcon />
      </StyledIconButton>

      {children}

      <StyledIconButton
        filled={filled}
        shape={shape}
        hasChildren={!!children}
        onClick={onNext}
        {...rightButtonProps}
        sx={{
          right: 16,
          ...rightButtonProps?.sx,
        }}
      >
        <RightIcon />
      </StyledIconButton>
    </Stack>
  );
}
