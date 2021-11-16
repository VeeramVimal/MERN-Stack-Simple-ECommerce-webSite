import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from '../Home';
import CartView from '../CartView';
import CheckOut1 from '../Checkout1Page';
import Coupon from '../Coupon';
import UserLogin from '../User_Login/UserLogin';
import Register from '../User_Login/Register';
import Protectedrouter from '../ProtectedRouter/Protected.Router'

const Main = () =>(
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path= '/login' component={UserLogin}/>
        <Route exact path= '/Register' component={Register}/>
        <Protectedrouter exact path="/cart" component={CartView} />
        <Protectedrouter exact path="/CheckOut1" component={CheckOut1} />
        <Protectedrouter exact path="/Coupon_Detail" component={Coupon} />
        <Route exact path= '*' component={() =>"404 NOT FOUND"}/>
      </Switch>
    )
export default Main;