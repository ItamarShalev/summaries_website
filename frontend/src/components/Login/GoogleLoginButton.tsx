import { useState } from "react";
import "./GoogleLoginButton.css";
import googleLogo from "../../assets/google-logo.svg";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google/login`;
  };

  return (
    <button onClick={handleLogin} disabled={loading} className="google-login-button">
      <img src={googleLogo} alt="Google" className="google-icon" />
      {loading ? "Redirecting..." : "Sign in with Google"}
    </button>
  );
}
