import Axios from 'axios';

const login = async (email, password) => {
  return Axios.post('http://localhost:5000/api/login', {
    email,
    password,
  }).then((response) => {
    console.log(response)
    localStorage.setItem("authtoken", response.data.token);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("first_name", response.data.user.first_name);
    return response.data;
  });
};
const logout = () => {
  localStorage.removeItem("authtoken");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("authtoken"));
};
const authService = {
  login,
  logout,
  getCurrentUser,
};
export default authService;