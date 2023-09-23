import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Button, Stack} from "@chakra-ui/react";
import CustomInput from "../UI/CustomInput.jsx";
import {saveAddress} from "../../services/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../services/notification.js";

const AddAddressForm = ({address, shouldFetchShopDetails, isNewDataAdded, onClose}) => {
    const {user} = useAuth();

    const FORM_INITIAL_VALUES = {
        areaName: `${address?.areaName ? address?.areaName : ''}`,
        city: `${address?.city ? address?.city : ''}`,
        country: `${address?.country ? address?.country : ''}`,
        district: `${address?.district ? address?.district : ''}`,
        landmark: `${address?.landmark ? address?.landmark : ''}`,
        pincode: `${address?.pincode ? address?.pincode : ''}`,
        roomNumber: `${address?.roomNumber ? address?.roomNumber : ''}`,
        state: `${address?.state ? address?.state : ''}`,
        subDistrict: `${address?.subDistrict ? address?.subDistrict : ''}`,
    };

    const FORM_VALIDATION_SCHEMA = Yup.object().shape({
        areaName: Yup.string()
            .required('Area name is required'),
        city: Yup.string()
            .required('City is required'),
        country: Yup.string()
            .required('Country is required'),
        district: Yup.string()
            .required('District is required'),
        landmark: Yup.string()
            .required('Landmark is required'),
        pincode: Yup.string()
            .required('Pin code is required'),
        roomNumber: Yup.string()
            .required('Room number is required'),
        state: Yup.string()
            .required('State is required'),
        subDistrict: Yup.string()
            .required('Sub state is required'),
    });

    const formSubmissionHandler = (values, {setSubmitting}) => {
        setSubmitting(true);
        saveAddress(user?.userId, values)
            .then(res => {
                successNotification(
                    "Success",
                    "Address successfully added"
                )
                shouldFetchShopDetails.current = true;
                isNewDataAdded(prevState => (!prevState));
                onClose();
            }).catch(err => {
            console.log(err);
            errorNotification(
                err.code,
                err.response?.data?.message
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
                    <Stack spacing={6} p={4}>
                        <CustomInput
                            id="areaName"
                            label="Area Name"
                            name="areaName"
                            type="text"
                            placeholder="Enter your area name"
                        />

                        <CustomInput
                            id="city"
                            label="City"
                            name="city"
                            type="text"
                            placeholder="Enter your city"
                        />

                        <CustomInput
                            id="country"
                            label="Country"
                            name="country"
                            type="text"
                            placeholder="Enter your country"
                        />

                        <CustomInput
                            id="district"
                            label="District"
                            name="district"
                            type="text"
                            placeholder="Enter your district"
                        />

                        <CustomInput
                            id="landmark"
                            label="Landmark"
                            name="landmark"
                            type="text"
                            placeholder="Enter your landmark"
                        />

                        <CustomInput
                            id="pincode"
                            label="Pin Code"
                            name="pincode"
                            type="number"
                            placeholder="Enter your pin code"
                        />

                        <CustomInput
                            id="roomNumber"
                            label="Room Number"
                            name="roomNumber"
                            type="number"
                            placeholder="Enter your room number"
                        />

                        <CustomInput
                            id="state"
                            label="State"
                            name="state"
                            type="text"
                            placeholder="Enter your state"
                        />

                        <CustomInput
                            id="subDistrict"
                            label="Sub District"
                            name="subDistrict"
                            type="text"
                            placeholder="Enter your sub district"
                        />

                        <Button
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            loadingText="Submitting"
                            colorScheme={'blue'}
                            variant={'solid'}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    )
}

export default AddAddressForm;
