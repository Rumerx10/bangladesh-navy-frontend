"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "@/src/components/theme/ThemeProvider";
// import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  // Toastify paints its own surface from an inline theme rather than from our
  // tokens, so it is one of the few places the theme has to be handed over in
  // JS instead of inherited through CSS.
  const { theme } = useTheme();

  return (
    <ToastContainer
      aria-label="Notification"
      position="top-right"
      theme={theme}
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
