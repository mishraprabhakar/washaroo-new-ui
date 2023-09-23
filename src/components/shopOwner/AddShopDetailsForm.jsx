import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Box, Button, Stack} from "@chakra-ui/react";
import CustomInput from "../UI/CustomInput.jsx";
import {addOrUpdateShopDetails} from "../../services/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../services/notification.js";

const AddShopDetailsForm = ({data, setIsNewDataAdded, shouldFetchShopDetails}) => {
    const {user} = useAuth();

    const FORM_INITIAL_VALUES = {
        shopName: `${data?.shopName ? data?.shopName : ''}`,
        serveItemLimit: `${data?.serveItemLimit ? data?.serveItemLimit : ''}`,
    };

    const FORM_VALIDATION_SCHEMA = Yup.object().shape({
        shopName: Yup.string()
            .min(3, 'Shop name must be at least 3 character long')
            .required('Shop name is required'),
        serveItemLimit: Yup.number()
            .min(1, 'Must be at least 1 digit')
            .required('Serve limit is required'),
    });


    const formSubmissionHandler = (values, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        addOrUpdateShopDetails(user?.userId, values)
            .then(res => {
                successNotification(
                    "Success",
                    "Shop details added successfully"
                )
                shouldFetchShopDetails.current = true;
                setIsNewDataAdded(prevState => (!prevState));
            }).catch(err => {
            errorNotification(
                err.code,
                err.response.data?.message
            )
        }).finally(() => {
            setSubmitting(false);
        })
    }

    return (
        <Formik
            validateOnMount={true}
            validationSchema={FORM_VALIDATION_SCHEMA}
            initialValues={FORM_INITIAL_VALUES}
            onSubmit={formSubmissionHandler}
        >
            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={4}>
                        <Box>
                            <CustomInput
                                id="shopName"
                                label="Shop Name"
                                name="shopName"
                                type="text"
                                placeholder="Enter your shop name"
                            />
                        </Box>

                        <Box>
                            <CustomInput
                                id="serveItemLimit"
                                label="Serve Item Limit"
                                name="serveItemLimit"
                                type="number"
                                placeholder="Enter your serve item limit"
                            />
                        </Box>

                        <Box>
                            <Button
                                isDisabled={!isValid}
                                isLoading={isSubmitting}
                                loadingText={"Submitting"}
                                variant={"outline"}
                                type="submit"
                                bg={'blue.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}

export default AddShopDetailsForm;
