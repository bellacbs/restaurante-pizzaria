import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CartPage from "../pages/CartPage/CartPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import FeedPage from "../pages/FeedPage/FeedPage";
import Login from "../pages/Login/Login";
import OrderDetails from "../pages/ProfilePage/OrderDetails";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Splash from "../pages/Splash/Splash";

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component = {Splash}/>
                <Route exact path="/login" component = {Login}/>
                <Route exact path="/cadastro" component = {SignUpPage}/>
                <Route exact path="/feed" component = {FeedPage}/>
                <Route exact path="/cart" component = {CartPage} />
                <Route exact path="/profile" component = {ProfilePage}/>
                <Route exact path="/order-details/:orderid" component={OrderDetails}/>
                <Route component = {ErrorPage}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Router