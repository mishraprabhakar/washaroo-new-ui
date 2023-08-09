import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Container,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import {LuAsterisk} from "react-icons/lu";
import {AiOutlinePlus} from "react-icons/ai";
import ShowServeItemDetails from "./ShowServeItemDetails.jsx";
import {BiSearch} from "react-icons/bi";
import {useRef, useState} from "react";
import AddItemForm from "./AddItemForm.jsx";

const ViewProfileDetails = ({data, setIsNewDataAdded, shouldFetchShopDetails}) => {
    const [enteredSearchItem, setEnteredSearchItem] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()

    const searchInputOnChangeHandler = (event) => {
        setEnteredSearchItem(event.target.value.toLocaleString().toLowerCase());
    }

    return (
        <Container
            maxW='4xl'
            mt={4}
            mb={4}
            p={9}
        >

            <Card
                overflow="hidden"
                variant="outline"
                p={6}
                md={{p: 9}}
                borderRadius={10}
                mb={5}
            >
                <CardHeader
                    display={"flex"}
                    justifyContent={"center"}
                >
                    <Heading
                        fontSize={25}
                    >
                        Profile Details
                    </Heading>
                </CardHeader>

                <Divider/>

                <CardBody>
                    <Stack spacing={4}>

                        <Text
                            fontWeight={"bold"}
                            fontSize={20}
                            textDecoration={"underline"}
                        >
                            Personal Details
                        </Text>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    Firstname
                                </Text>
                                <Input
                                    defaultValue={data?.user?.firstName}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                            <Box>
                                <Text>
                                    Lastname
                                </Text>
                                <Input
                                    defaultValue={data?.user?.lastName}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    Email
                                </Text>
                                <Input
                                    defaultValue={data?.user?.email}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                            <Box>
                                <Text>
                                    Contact Number
                                </Text>
                                <Input
                                    defaultValue={data?.user?.contactNumber}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <Text
                            fontWeight={"bold"}
                            fontSize={20}
                            textDecoration={"underline"}
                        >
                            Shop Details
                        </Text>


                        <HStack
                            justifyContent={"space-between"}
                        >

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Shop Name
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.shopName}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Serve Limit
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                    <Box
                                        ml={2}
                                        fontWeight={"bold"}
                                    >
                                        <Tooltip
                                            label="Mention customer serve limit for your shop (i.e. 10)."
                                            aria-label='Question'
                                        >
                                            ?
                                        </Tooltip>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.serveItemLimit}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>
                        </HStack>

                        <Text
                            fontWeight={"bold"}
                            fontSize={20}
                            textDecoration={"underline"}
                        >
                            Items
                        </Text>

                        <Card
                            overflow="hidden"
                            variant="outline"
                            p={6}
                            md={{p: 9}}
                            borderRadius={10}
                            mb={5}
                        >
                            <CardHeader display={"flex"} justifyContent={"space-between"}>
                                <Box>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents='none'>
                                            <BiSearch/>
                                        </InputLeftElement>
                                        <Input
                                            type='text'
                                            placeholder='Search Item'
                                            onChange={searchInputOnChangeHandler}
                                        />
                                    </InputGroup>
                                </Box>
                                <Box>
                                    <Button
                                        leftIcon={<AiOutlinePlus/>}
                                        colorScheme='linkedin'
                                        variant='outline'
                                        size={"sm"}
                                        ref={btnRef}
                                        onClick={onOpen}
                                    >
                                        Add
                                    </Button>

                                    <Drawer
                                        isOpen={isOpen}
                                        placement='right'
                                        onClose={onClose}
                                        finalFocusRef={btnRef}
                                    >
                                        <DrawerOverlay/>
                                        <DrawerContent>
                                            <DrawerCloseButton/>
                                            <DrawerHeader>Create New Item</DrawerHeader>

                                            <DrawerBody>
                                                <AddItemForm setIsNewDataAdded={setIsNewDataAdded}
                                                             shouldFetchShopDetails={shouldFetchShopDetails}/>
                                            </DrawerBody>

                                            <DrawerFooter>
                                                <Button variant='outline' mr={3} onClick={onClose}>
                                                    Cancel
                                                </Button>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                </Box>
                            </CardHeader>

                            <CardBody>
                                {
                                    enteredSearchItem && data?.shopDetails?.listOfItems?.filter(item =>
                                        item.name.toLowerCase().startsWith(enteredSearchItem))
                                        .map(item => <ShowServeItemDetails
                                            key={item?.itemId}
                                            item={item}
                                            setIsNewDataAdded={setIsNewDataAdded}
                                            shouldFetchShopDetails={shouldFetchShopDetails}
                                        />)
                                }
                                {
                                    !enteredSearchItem && data?.shopDetails?.listOfItems?.map(item =>
                                        <ShowServeItemDetails
                                            key={item?.itemId}
                                            item={item}
                                            setIsNewDataAdded={setIsNewDataAdded}
                                            shouldFetchShopDetails={shouldFetchShopDetails}
                                        />)
                                }
                                {
                                    enteredSearchItem && data?.shopDetails?.listOfItems?.filter(item =>
                                        item.name.toLowerCase()
                                            .startsWith(enteredSearchItem)).length === 0 ?
                                        <Center><Text color={"red.400"}>No Details Found 🥲</Text></Center> : ""
                                }
                                {
                                    !enteredSearchItem && data?.shopDetails?.listOfItems?.length === 0 &&
                                    <Center><Text color={"red.400"}>No Items 😒</Text></Center>
                                }
                            </CardBody>
                        </Card>

                        <Text
                            fontWeight={"bold"}
                            fontSize={20}
                            textDecoration={"underline"}
                        >
                            Account Details
                        </Text>

                        <HStack
                            justifyContent={"space-between"}
                        >

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Account Number
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.accountDetails?.accountNumber}
                                    minW={"300px"}
                                    type={"number"}
                                    placeholder={"Please update account number"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Branch Name
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.accountDetails?.branchName}
                                    minW={"300px"}
                                    type={"text"}
                                    placeholder={"Please update branch name"}
                                />
                            </Box>
                        </HStack>

                        <HStack
                            justifyContent={"space-between"}
                        >
                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            IFSC
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.accountDetails?.ifsc}
                                    minW={"300px"}
                                    type={"text"}
                                    placeholder={"Please update IFSC code"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Bank Name
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    defaultValue={data?.shopDetails?.accountDetails?.bankName}
                                    minW={"300px"}
                                    type={"text"}
                                    placeholder={"Please update bank name"}
                                />
                            </Box>
                        </HStack>

                        <Box>
                            <Flex>
                                <Box>
                                    <Text
                                    >
                                        Account Type
                                    </Text>
                                </Box>
                                <Box color={"red.300"}>
                                    <LuAsterisk/>
                                </Box>
                            </Flex>
                            <Input
                                defaultValue={data?.shopDetails?.accountDetails?.accountType}
                                minW={"300px"}
                                type={"text"}
                                placeholder={"Please update account type"}
                            />
                        </Box>

                    </Stack>
                </CardBody>
            </Card>

        </Container>
    )
        ;
}

export default ViewProfileDetails;
