import React from "react"
// import  ReactDOM  from "react-dom"
// import { route } from "../../../backend/Routes/User.route";
import { Switch, Route } from "react-router-dom"

import AddProduct from '../Products/AddProduct';
import EditProduct from '../Products/EditProduct';
import ListProduct from "../Products/ListProduct";
import AdminLogin from "../Login/AdminLogin";
import Protectedrouter from '../ProtectedRouter/Protected.Router'

function Main() {
    return (
<Switch>
      <Route exact path= '/' component={AdminLogin}/>
      <Protectedrouter path='/addUser' component={AddProduct} />
      <Protectedrouter path='/editProduct/:id' component={EditProduct} />
      <Protectedrouter exact path='/list' component={ListProduct} />
      <Route exact path= '*' component={() =>"404 NOT FOUND"}/>
</Switch>
    );

}
export default Main;

