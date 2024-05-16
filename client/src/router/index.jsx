import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Login from "../screens/login"
import Register from "../screens/register"
import ForgetPassword from "../screens/forgot-password"
import ResetPassword from "../screens/reset-password"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<ForgetPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter