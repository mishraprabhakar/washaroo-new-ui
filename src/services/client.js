import axios from "axios";

export const saveUser = async (user) => {
    try {
        return await axios.post(
            "http://localhost:8080/api/v1/users",
            user
        )
    } catch (e) {
        throw e;
    }
}