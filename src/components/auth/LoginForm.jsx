import {Button, Checkbox, Flex, Heading, Image, Stack, Text,} from '@chakra-ui/react'
import {Form, Formik} from "formik";
import * as Yup from "yup";
import CustomInput from "../UI/CustomInput.jsx";
import signInPageImg from "../../assets/signin-page-img.svg";
import {errorNotification, successNotification} from "../../services/notification.js";

const FORM_INITIAL_VALUES = {
    username: '',
    password: '',
};

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    username: Yup.string()
        .email('Invalid email, please try again.')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(25, 'Must be 25 characters or less')
        .required('Password is required')
});

export default function LoginForm() {

    const formSubmissionHandler = (values, {setSubmitting, resetForm}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);

            if (values.username === "prabhakar@gmail.com" && values.password === "prabhakar@123") {
                successNotification(
                    "Success",
                    "User successfully logged in"
                );
            } else {
                errorNotification(
                    "Error",
                    "Invalid credentials, please try again."
                )
            }

        }, 3000);
    }

    return (
        <Stack
            minH={'100vh'}
            direction={{base: 'column', md: 'row'}}
        >
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <Formik
                        validateOnMount={true}
                        initialValues={FORM_INITIAL_VALUES}
                        validationSchema={FORM_VALIDATION_SCHEMA}
                        onSubmit={formSubmissionHandler}
                    >
                        {({isValid, isSubmitting}) => (
                            <Form>
                                <CustomInput
                                    id="username"
                                    label="Email"
                                    name="username"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                                <CustomInput
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                />

                                <Stack spacing={6}>
                                    <Stack
                                        direction={{base: 'column', sm: 'row'}}
                                        align={'start'}
                                        justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Text color={'blue.500'}>Forgot password?</Text>
                                    </Stack>
                                    <Button
                                        isDisabled={!isValid}
                                        isLoading={isSubmitting}
                                        loadingText="Submitting"
                                        colorScheme={'blue'}
                                        variant={'solid'}
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    opacity="0.8"
                    src={signInPageImg}
                />
            </Flex>
        </Stack>
    )
}
