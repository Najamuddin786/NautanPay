import { Route,Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";
import History from "../Pages/History";
import Recharge from "../Pages/Recharge";
import Profile from "../Pages/Profile";

export default function AllRouter(){

    return <>
            <Routes>
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path="/recharge" element={<PrivateRoute><Recharge/></PrivateRoute>}/>
                <Route path="/history" element={<PrivateRoute><History/></PrivateRoute>}/>
                
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgetPassword" element={<ForgetPassword/>}/>
            </Routes>
    </>
}