"use client";

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.hasError && this.state.hasError) {
      // If hasError state changed from false to true, reload the page after 400ms
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontSize: 1 }}>.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
