'use client'

import {Box, Button, Flex, Heading, HStack, Link, Stack, Text, useColorModeValue,} from '@chakra-ui/react'
import {useState} from 'react'
import * as Yup from "yup";
import {Form, Formik} from "formik";
import CustomInput from "../UI/CustomInput.jsx";
import CustomSelect from "../UI/CustomSelect.jsx";
import {Link as RounterLink, useNavigate} from "react-router-dom";
import {saveUser} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";

const INITIAL_VALUES = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    contactNumber: ''
}

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
    firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    contactNumber: Yup.number()
        .min(1000000000, 'Must be at least 10 digit')
        .max(9999999999, 'Must be less than 10 digit')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(25, 'Must be 25 characters or less')
        .required('Password is required'),
    role: Yup.string()
        .oneOf(
            ['LAUNDRY_SHOP_OWNER', 'CUSTOMER'],
            'Invalid Role'
        )
        .required('Required')
});

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const formSubmissionHandler = (values, {setSubmitting}) => {
        setSubmitting(true);

        saveUser(values)
            .then(res => {
                successNotification(
                    "Success",
                    "Registration successfully completed."
                );
                navigate("/login");
            }).catch(err => {
            console.log(err);
            errorNotification(
                err.code,
                err.response?.data.message
            );
        }).finally(() => {
            setSubmitting(false);
        })
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Formik
                            validateOnMount={true}
                            initialValues={INITIAL_VALUES}
                            validationSchema={FORM_VALIDATION_SCHEMA}
                            onSubmit={formSubmissionHandler}
                        >
                            {({isValid, isSubmitting}) => (
                                <Form>
                                    <HStack>
                                        <Box>
                                            <CustomInput
                                                id="firstName"
                                                label="Firstname"
                                                name="firstName"
                                                type="text"
                                                placeholder="Enter your firstname"
                                            />
                                        </Box>
                                        <Box>
                                            <CustomInput
                                                id="lastName"
                                                label="Lastname"
                                                name="lastName"
                                                type="text"
                                                placeholder="Enter your lastname"
                                            />
                                        </Box>
                                    </HStack>

                                    <Stack>
                                        <CustomInput
                                            id="email"
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                        />

                                        <CustomInput
                                            id="contactNumber"
                                            label="Contact Number"
                                            name="contactNumber"
                                            type="number"
                                            placeholder="Enter your contact number"
                                        />

                                        <CustomInput
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                        />

                                        <CustomSelect label="How do you want to use ?" name="role">
                                            <option value="">Select your role</option>
                                            <option value="CUSTOMER">As a Customer</option>
                                            <option value="LAUNDRY_SHOP_OWNER">As a Shop Owner</option>
                                        </CustomSelect>

                                        <Flex mt={2} justifyContent="space-between">
                                            <Box>
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
                                            </Box>
                                            <Flex flexDirection="row" gap={2}>
                                                <Text>
                                                    Already have an account ?
                                                </Text>
                                                <Link
                                                    as={RounterLink}
                                                    to="/login"
                                                    color="blue.500"
                                                    textDecoration="none"
                                                    fontWeight="bold"
                                                    _hover={{
                                                        textDecoration: "underline",
                                                        color: "cyan.500"
                                                    }}
                                                >
                                                    Login
                                                </Link>
                                            </Flex>
                                        </Flex>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
