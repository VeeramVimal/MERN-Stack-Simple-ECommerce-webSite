import axios from 'axios';
import { API_URL } from '../config/config';

class UserService {

deleteEmployee(id) {
axios
  .get(`${API_URL}/User/deleteUser/` + id)
  .then(() => {
    console.log("User Deleted !!!");
  })
  .catch((error) => {
    console.log(error);
  });
}
}

export default UserService;