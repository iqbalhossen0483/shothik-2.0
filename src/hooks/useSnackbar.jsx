import { useSnackbarHook } from "../config/NotificationProvider";

const useSnackbar = () => {
  const {
    showSuccessSnackbar,
    showErrorSnackbar,
    showInfoSnackbar,
    showWarningSnackbar,
  } = useSnackbarHook();

  const showSnackbar = (message, options) => {
    const { variant } = options || { variant: "success" };

    switch (variant) {
      case "success":
        showSuccessSnackbar(message);
        break;
      case "error":
        showErrorSnackbar(message);
        break;
      case "info":
        showInfoSnackbar(message);
        break;
      case "warning":
        showWarningSnackbar(message);
        break;
      default:
        showSuccessSnackbar(message);
    }
  };

  return showSnackbar;
};

export default useSnackbar;
