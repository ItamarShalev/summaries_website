// src/pages/Login.tsx
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    setLoading(true);
    setError(null);

    try {
      window.location.href = `${import.meta.env.VITE_BACKEND_API_URL}/auth/google/login`;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50"
      >
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-5 h-5"
        />
        {loading ? "Redirecting..." : "Sign in with Google"}
      </button>
    </div>
  );
}
