export default function authHeader() {
  const token = localStorage.getItem("authtoken");
  if (token) {
    return  `Bearer ${token}`;
  } else {
    return {};
  }
}