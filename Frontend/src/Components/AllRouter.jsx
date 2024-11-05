import { Route,Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";

export default function AllRouter(){

    return <>
            <Routes>
                <Route path="/" element={<Signup/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
    </>
}