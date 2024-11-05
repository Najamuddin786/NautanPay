import { Route,Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import ForgetPassword from "../Pages/ForgetPassword";
import Home from "../Pages/Home";

export default function AllRouter(){

    return <>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/" element={<Signup/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgetPassword" element={<ForgetPassword/>}/>
            </Routes>
    </>
}