// ----------------------------------------------------------------------

export default function Popover(theme) {
  return {
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.dropdown,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
        },
      },
    },
  };
}
