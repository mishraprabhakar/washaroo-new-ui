import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {login as performLogin} from "../services/client.js"
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const setUserFromToken = () => {
        let token = localStorage.getItem("access_token");
        let user = localStorage.getItem("user");

        if (token && user) {
            user = JSON.parse(user);
            token = jwtDecode(token);

            setUser({
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNumber: user.contactNumber,
                roles: token.roles
            })
        }
    }

    useEffect(() => {
        setUserFromToken()
    }, [])


    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.data?.token;
                const user = res.data?.user;

                localStorage.setItem("access_token", jwtToken);
                localStorage.setItem("user", JSON.stringify(user));

                const decodedToken = jwtDecode(jwtToken);

                setUser({
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    contactNumber: user.contactNumber,
                    roles: decodedToken.roles
                })

                console.log(user);
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const logOut = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
        setUser(null)
    }

    const isUserAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const {exp: expiration} = jwtDecode(token);
        if (Date.now() > expiration * 1000) {
            logOut()
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logOut,
            isUserAuthenticated,
            setUserFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
