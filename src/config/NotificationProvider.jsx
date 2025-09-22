import React from "react";
import ErrorSnackbar from "./notification/ErrorSnackbar";
import InfoSnackbar from "./notification/InfoSnackbar";
import SuccessSnackbar from "./notification/SuccessSnackbar";
import WarningSnackbar from "./notification/WarningSnackbar";

const NotificationContext = React.createContext();

export function useSnackbarHook() {
  return React.useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState("");
  const [warningOpen, setWarningOpen] = React.useState(false);
  const [warningMessage, setWarningMessage] = React.useState("");

  const showSuccessSnackbar = (message) => {
    setSuccessMessage(message);
    setSuccessOpen(true);
  };

  const showErrorSnackbar = (message) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };

  const showInfoSnackbar = (message) => {
    setInfoMessage(message);
    setInfoOpen(true);
  };

  const showWarningSnackbar = (message) => {
    setWarningMessage(message);
    setWarningOpen(true);
  };

  const closeSuccessSnackbar = () => {
    setSuccessOpen(false);
  };

  const closeErrorSnackbar = () => {
    setErrorOpen(false);
  };

  const closeInfoSnackbar = () => {
    setInfoOpen(false);
  };

  const closeWarningSnackbar = () => {
    setWarningOpen(false);
  };

  const value = {
    showSuccessSnackbar,
    showErrorSnackbar,
    showInfoSnackbar,
    showWarningSnackbar,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <SuccessSnackbar
        open={successOpen}
        onClose={closeSuccessSnackbar}
        message={successMessage}
      />
      <ErrorSnackbar
        open={errorOpen}
        onClose={closeErrorSnackbar}
        message={errorMessage}
      />
      <InfoSnackbar
        open={infoOpen}
        onClose={closeInfoSnackbar}
        message={infoMessage}
      />
      <WarningSnackbar
        open={warningOpen}
        onClose={closeWarningSnackbar}
        message={warningMessage}
      />
    </NotificationContext.Provider>
  );
}
