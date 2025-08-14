import { useAuth } from "../../../context/AuthContext";

export default function UserInfo() {
  const auth = useAuth();
  if (!auth) return null;

  const { user, logout } = auth;
  if (!user) return null;

  return (
    <div>
      <img src={user.picture} alt="profile" width={50} />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
