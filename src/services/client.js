import axios from "axios";

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})

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

export const login = async (usernameAndPassword) => {
    try {
        return await axios.post(
            "http://localhost:8087/api/v1/auth",
            usernameAndPassword
        )
    } catch (e) {
        throw e;
    }
}

export const fetchLaundryShopOwnerDetails = async (userId) => {
    try {
        return await axios.get(
            `http://localhost:8080/api/v1/laundry-shop/shop/${userId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const addItem = async (userId, item) => {
    try {
        return await axios.post(
            `http://localhost:8080/api/v1/laundry-shop/items/${userId}`,
            item,
            getAuthConfig()
        )
    } catch (e) {
        throw  e;
    }
}

export const deleteItem = async (itemId) => {
    try {
        return await axios.delete(
            `http://localhost:8080/api/v1/laundry-shop/items/${itemId}`,
            getAuthConfig()
        )
    } catch (e) {
        throw e;
    }
}

export const addOrUpdateAccountDetails = async (userId, accountDetails) => {
    try {
        return await axios.post(
            `http://localhost:8080/api/v1/laundry-shop/accounts/${userId}`,
            accountDetails,
            getAuthConfig()
        )
    } catch (e) {
        throw  e;
    }
}
