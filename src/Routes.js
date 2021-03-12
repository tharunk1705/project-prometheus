import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from './auth/helper/AdminRoutes';
import AdminDashboard from "./user/AdminDashboard";
import NotFound from "./core/NotFound";
import UserDashboard from './user/UserDashboard';
import UnderConstruction from './core/UnderConstruction';
import AddCategory from './admin/AddCategory';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/user/:userId/dashboard" exact component={UserDashboard} />
                <Route path="/user/search" exact component={UnderConstruction} />
                <Route path="/user/:userId/signup-as-donor" exact component={UnderConstruction} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/create/category" exact component={AddCategory} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;