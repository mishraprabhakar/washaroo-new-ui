import ViewProfileDetails from "../components/shopOwner/ViewProfileDetails.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {fetchAddress, fetchLaundryShopOwnerDetails} from "../services/client.js";
import {errorNotification} from "../services/notification.js";
import {Box, Center, Heading, HStack, Spinner, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import ShowCustomerAddress from "../components/customer/ShowCustomerAddress.jsx";

const ViewProfilePage = () => {

    // refs for managing reloads
    const shouldNavigate = useRef(true);
    const shouldFetchShopDetails = useRef(true);

    // states for managing backend api
    const [isFetching, setIsFetching] = useState(true);
    const [isNewDataAdded, setIsNewDataAdded] = useState(false);
    const [error, setError] = useState(null);

    // custom hook for auth
    const {user, isUserAuthenticated, loading} = useAuth();
    const navigate = useNavigate();

    // shop details state
    const [shopDetails, setShopDetails] = useState({});
    const [address, setAddress] = useState();

    const fetchShopDetails = (userId) => {
        fetchLaundryShopOwnerDetails(userId)
            .then(res => {
                const details = res.data?.data;

                const shopDetails = {
                    shopName: details?.shopName,
                    serveItemLimit: details?.serveItemLimit,
                    rating: details?.shopRatedByCustomer,
                    listOfItems: details?.servedList,
                    accountDetails: details?.accountDetails
                };

                setShopDetails(shopDetails);
            }).catch(err => {
            setError(err.response.data);
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setIsFetching(false);
        })
    }

    const fetchCustomerDetails = (userId) => {
        fetchAddress(userId)
            .then(res => {
                const address = res.data?.data;
                setAddress({...address});
            }).catch(err => {
            errorNotification(
                err.code,
                err.response.data.message
            )
        }).finally(() => {
            setIsFetching(false);
        })
    }

    useEffect(() => {
        if (!isUserAuthenticated() && shouldNavigate.current) {
            shouldNavigate.current = false;
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (isUserAuthenticated() && shouldFetchShopDetails.current && !loading) {
            console.log("inside if", isNewDataAdded, shouldFetchShopDetails);
            shouldFetchShopDetails.current = false;

            // user?.roles === "LAUNDRY_SHOP_OWNER" ?
            //     fetchShopDetails(user?.userId) : fetchCustomerDetails(user?.userId);

            fetchCustomerDetails(user?.userId);
            user?.roles === "LAUNDRY_SHOP_OWNER" && fetchShopDetails(user?.userId);
        }
    }, [loading, isNewDataAdded])

    if (isFetching) {
        return (
            <Center
                height={"85vh"}
            >
                <Box
                    bg={useColorModeValue("gray.100", "black")}
                    p={6}
                    borderRadius={10}
                    textAlign={"center"}
                    boxShadow={"xl"}
                >
                    <Text
                        fontWeight={"bold"}
                        mb={4}
                    >
                        Loading...
                    </Text>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='red.200'
                        color='cyan.500'
                        size='lg'
                    />
                </Box>
            </Center>
        );
    }

    if (error) {
        return (
            <Center
                height={"85vh"}
            >
                <Stack>
                    <Box>
                        <Heading fontSize={"lg"}>
                            Something went wrong
                        </Heading>
                    </Box>
                    <Box>
                        <HStack>
                            <Box>
                                <Text fontWeight={"bold"}>
                                    Error Message:
                                </Text>
                            </Box>
                            <Box>
                                <Text>
                                    {error.message}
                                </Text>
                            </Box>
                        </HStack>
                    </Box>
                </Stack>
            </Center>
        )
    }


    return <>
        {user?.roles === "LAUNDRY_SHOP_OWNER" && <ViewProfileDetails
            data={shopDetails}
            address={address}
            setIsNewDataAdded={setIsNewDataAdded}
            shouldFetchShopDetails={shouldFetchShopDetails}
        />}
        {user?.roles === "CUSTOMER" && <ShowCustomerAddress
            address={address}
            isNewDataAdded={setIsNewDataAdded}
            shouldFetchShopDetails={shouldFetchShopDetails}
        />}
    </>
}

export default ViewProfilePage;
