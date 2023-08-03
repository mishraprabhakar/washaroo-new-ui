import SignUpForm from "../components/auth/SignUpForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const SignUpPage = () => {

    const {isUserAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserAuthenticated()) {
            navigate("/")
        }
    }, [])

    return <SignUpForm/>
}

export default SignUpPage;
