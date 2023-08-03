import LoginForm from "../components/auth/LoginForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const {isUserAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAuthenticated()) {
            navigate("/")
        }
    }, [])


    return <LoginForm/>
}

export default LoginPage;
