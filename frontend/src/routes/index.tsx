import { Routes, Route } from "react-router-dom";
import Healthy from "../pages/Healthy";
import NotFound from "../pages/NotFound";
import OAuthCallback from "../pages/OAuthCallback";
import GoogleLoginButton from "../components/Login/GoogleLoginButton";

export default function IndexRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GoogleLoginButton />} />
      <Route path="/healthy" element={<Healthy />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/login" element={<GoogleLoginButton />} />
      {/* Catch-all route for unknown URLs */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
