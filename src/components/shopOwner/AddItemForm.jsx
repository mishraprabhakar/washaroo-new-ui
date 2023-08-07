import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Box, Button, Stack} from "@chakra-ui/react";
import CustomInput from "../UI/CustomInput.jsx";
import {addItem} from "../../services/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import {errorNotification, successNotification} from "../../services/notification.js";

const FORM_INITIAL_VALUES = {
    name: '',
    price: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Item name must be more than 3 character long')
        .required('Item name is required'),
    price: Yup.number()
        .min(1, 'Must be at least 1 digit')
        .required('Price is required'),
});

const AddItemForm = ({setIsNewDataAdded, shouldFetchShopDetails}) => {
    const {user} = useAuth();

    const formSubmissionHandler = (values, {setSubmitting, resetForm}) => {
        addItem(user?.userId, values)
            .then(res => {
                successNotification(
                    "Success",
                    "Item added successfully"
                )
                resetForm();
                shouldFetchShopDetails.current = true;
                setIsNewDataAdded(true);
            }).catch(err => {
            errorNotification(
                err.code,
                err.response
            )
        }).finally(() => {
            setSubmitting(false);
        })
    }

    return (
        <Formik
            validateOnMount={true}
            initialValues={FORM_INITIAL_VALUES}
            validationSchema={FORM_VALIDATION_SCHEMA}
            onSubmit={formSubmissionHandler}
        >
            {({isValid, isSubmitting}) => (
                <Form>
                    <Stack spacing={4}>
                        <Box>
                            <CustomInput
                                id="name"
                                label="Item Name"
                                name="name"
                                type="text"
                                placeholder="Enter your item name"
                            />
                        </Box>
                        <Box>
                            <CustomInput
                                id="price"
                                label="Price"
                                name="price"
                                type="number"
                            />
                        </Box>
                        <Box display={"flex"} justifyContent={"end"}>
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

export default AddItemForm;
