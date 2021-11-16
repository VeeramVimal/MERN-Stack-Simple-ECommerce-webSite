import axios from 'axios';
 
class UserService {

deleteEmployee(id) {
axios.get('http://localhost:8000/User/deleteUser/' + id)
.then(() => {
console.log('User Deleted !!!')
})
.catch((error) => {
console.log(error)
})
}
}

export default UserService;