import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Button, Stack} from "@chakra-ui/react";
import CustomInput from "../UI/CustomInput.jsx";
import {addOrUpdateAccountDetails} from "../../services/client.js";
import {useAuth} from "../../context/AuthContext.jsx";
import {errorNotification, successNotification} from "../../services/notification.js";

const AddAccountDetailsForm = ({data, update, onClose, shouldFetchShopDetails}) => {
    const {user} = useAuth();

    const FORM_INITIAL_VALUES = {
        accountNumber: `${data?.accountNumber ? data?.accountNumber : ''}`,
        branchName: `${data?.branchName ? data?.branchName : ''}`,
        ifsc: `${data?.ifsc ? data?.ifsc : ''}`,
        bankName: `${data?.bankName ? data?.bankName : ''}`,
        accountType: `${data?.accountType ? data?.accountType : ''}`
    };

    const FORM_VALIDATION_SCHEMA = Yup.object().shape({
        accountNumber: Yup.number()
            .min(100000, "Account number must be at least 6 digit long")
            .required('Account number is required'),
        branchName: Yup.string()
            .required('Branch name is required'),
        ifsc: Yup.string()
            .required("IFSC code is required"),
        bankName: Yup.string()
            .required("Bank name is required"),
        accountType: Yup.string()
            .required("Account Type is required")
    });


    const formSubmissionHandler = (values, {setSubmitting}) => {
        setSubmitting(true);
        addOrUpdateAccountDetails(user?.userId, values)
            .then(res => {
                successNotification(
                    "Success",
                    "Account details added successfully"
                )
                shouldFetchShopDetails.current = true;
                update(prevState => (!prevState));
                onClose();
            }).catch(err => {
            errorNotification(
                err.code,
                err.response.data.data.message
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

                        <CustomInput
                            id="accountNumber"
                            label="Account Number"
                            name="accountNumber"
                            type="number"
                            placeholder="Enter your account number"
                        />

                        <CustomInput
                            id="branchName"
                            label="Branch Name"
                            name="branchName"
                            type="text"
                            placeholder="Enter your branch name"
                        />

                        <CustomInput
                            id="ifsc"
                            label="IFSC"
                            name="ifsc"
                            type="text"
                            placeholder="Enter IFSC code"
                        />

                        <CustomInput
                            id="bankName"
                            label="Bank Name"
                            name="bankName"
                            type="text"
                            placeholder="Enter your bank name"
                        />

                        <CustomInput
                            id="accountType"
                            label="Account Type"
                            name="accountType"
                            type="text"
                            placeholder="Enter your account type"
                        />

                        <Button
                            isDisabled={!isValid}
                            isLoading={isSubmitting}
                            loadingText={"Submitting"}
                            type="submit"
                            bg={'blue.500'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Form>
            )}

        </Formik>
    );

}

export default AddAccountDetailsForm
