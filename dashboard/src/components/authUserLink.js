import axios from "./api/baseUrl";
import authHeader from "./authHeaders";
const userID = localStorage.getItem("id")

const getAllUser = () => {
  return axios.get("admin/users", {
    headers: {
      "Authorization": authHeader()
    }
  }
  );
};



const getSingleUser = () => {
  return axios.get(`admin/${userID}`,
    { headers: authHeader() }
  )
};

const addUser = () => {
  return axios.post('admin/users', {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authHeader(),
    },
  });
};

const authUserLink = {
  getAllUser, addUser, getSingleUser
};

export default authUserLink;