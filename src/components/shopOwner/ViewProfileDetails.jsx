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
    IconButton,
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
import {BsPencilSquare} from "react-icons/bs";
import CustomModal from "../UI/CustomModal.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import AddAccountDetailsForm from "./AddAccountDetailsForm.jsx";
import AddShopDetailsForm from "./AddShopDetailsForm.jsx";
import AddAddressForm from "../shared/AddAddressForm.jsx";

const ViewProfileDetails = ({data, address, setIsNewDataAdded, shouldFetchShopDetails}) => {
    const {user} = useAuth();

    const {
        isOpen: isOpenAccountDetailsModal,
        onOpen: onOpenAccountDetailsModal,
        onClose: onCloseAccountDetailsModal
    } = useDisclosure()

    const {
        isOpen: isOpenShopDetailsModal,
        onOpen: onOpenShopDetailsModal,
        onClose: onCloseShopDetailsModal
    } = useDisclosure();

    const {
        isOpen: isOpenAddressUpdateModal,
        onOpen: onOpenAddressUpdateModal,
        onClose: onCloseAddressUpdateModal
    } = useDisclosure();

    const [enteredSearchItem, setEnteredSearchItem] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef();

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
                                    value={user?.firstName}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                            <Box>
                                <Text>
                                    Lastname
                                </Text>
                                <Input
                                    value={user?.lastName}
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
                                    value={user?.email}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                            <Box>
                                <Text>
                                    Contact Number
                                </Text>
                                <Input
                                    value={user?.contactNumber}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <HStack spacing={4}>
                            <Text
                                fontWeight={"bold"}
                                fontSize={20}
                                textDecoration={"underline"}
                            >
                                Shop Details
                            </Text>
                            <IconButton
                                variant='outline'
                                colorScheme='gray'
                                aria-label='Call Sage'
                                fontSize='20px'
                                icon={<BsPencilSquare/>}
                                size={"xs"}
                                onClick={onOpenShopDetailsModal}
                            />
                        </HStack>


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
                                    value={data?.shopName}
                                    isDisabled={true}
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
                                    value={data?.serveItemLimit}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>
                            <CustomModal
                                title={"Update Shop Details"}
                                isOpen={isOpenShopDetailsModal}
                                onClose={onCloseShopDetailsModal}
                            >
                                <AddShopDetailsForm
                                    data={data}
                                    setIsNewDataAdded={setIsNewDataAdded}
                                    shouldFetchShopDetails={shouldFetchShopDetails}
                                />
                            </CustomModal>
                        </HStack>

                        <HStack spacing={4}>
                            <Text
                                fontWeight={"bold"}
                                fontSize={20}
                                textDecoration={"underline"}
                            >
                                Address
                            </Text>
                            <IconButton
                                variant='outline'
                                colorScheme='gray'
                                aria-label='Call Sage'
                                fontSize='20px'
                                icon={<BsPencilSquare/>}
                                size={"xs"}
                                onClick={onOpenAddressUpdateModal}
                            />
                            <CustomModal
                                title={"Add/Update address"}
                                onClose={onCloseAddressUpdateModal}
                                isOpen={isOpenAddressUpdateModal}
                            >
                                <AddAddressForm
                                    address={address}
                                    shouldFetchShopDetails={shouldFetchShopDetails}
                                    isNewDataAdded={setIsNewDataAdded}
                                    onClose={onCloseAddressUpdateModal}
                                />
                            </CustomModal>
                        </HStack>

                        <HStack
                            justifyContent={"space-between"}
                        >

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Area Name
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.areaName}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            City
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.city}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
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
                                            District
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.district}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Landmark
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.landmark}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
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
                                            Pin Code
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.pincode}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Room Number
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.roomNumber}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
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
                                            State
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.state}
                                    isDisabled={true}
                                    minW={"300px"}
                                    placeholder={"Please update shop name here"}
                                />
                            </Box>

                            <Box>
                                <Flex>
                                    <Box>
                                        <Text
                                        >
                                            Sub District
                                        </Text>
                                    </Box>
                                    <Box color={"red.300"}>
                                        <LuAsterisk/>
                                    </Box>
                                </Flex>
                                <Input
                                    value={address?.subDistrict}
                                    isDisabled={true}
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
                                    enteredSearchItem && data?.listOfItems?.filter(item =>
                                        item.name.toLowerCase().startsWith(enteredSearchItem))
                                        .map(item => <ShowServeItemDetails
                                            key={item?.itemId}
                                            item={item}
                                            setIsNewDataAdded={setIsNewDataAdded}
                                            shouldFetchShopDetails={shouldFetchShopDetails}
                                        />)
                                }
                                {
                                    !enteredSearchItem && data?.listOfItems?.map(item =>
                                        <ShowServeItemDetails
                                            key={item?.itemId}
                                            item={item}
                                            setIsNewDataAdded={setIsNewDataAdded}
                                            shouldFetchShopDetails={shouldFetchShopDetails}
                                        />)
                                }
                                {
                                    enteredSearchItem && data?.listOfItems?.filter(item =>
                                        item.name.toLowerCase()
                                            .startsWith(enteredSearchItem)).length === 0 ?
                                        <Center><Text color={"red.400"}>No Details Found 🥲</Text></Center> : ""
                                }
                                {
                                    !enteredSearchItem && data?.listOfItems?.length === 0 &&
                                    <Center><Text color={"red.400"}>No Items 😒</Text></Center>
                                }
                            </CardBody>
                        </Card>

                        <HStack gap={4}>
                            <Text
                                fontWeight={"bold"}
                                fontSize={20}
                                textDecoration={"underline"}
                            >
                                Account Details
                            </Text>
                            <IconButton
                                variant='outline'
                                colorScheme='gray'
                                aria-label='Call Sage'
                                fontSize='20px'
                                icon={<BsPencilSquare/>}
                                size={"xs"}
                                onClick={onOpenAccountDetailsModal}
                            />
                            <CustomModal
                                title={"Add/Update Account Details"}
                                isOpen={isOpenAccountDetailsModal}
                                onClose={onCloseAccountDetailsModal}
                            >
                                <AddAccountDetailsForm
                                    data={data?.accountDetails}
                                    update={setIsNewDataAdded}
                                    onClose={onCloseAccountDetailsModal}
                                    shouldFetchShopDetails={shouldFetchShopDetails}
                                />
                            </CustomModal>
                        </HStack>

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
                                    value={data?.accountDetails?.accountNumber}
                                    isDisabled={true}
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
                                    value={data?.accountDetails?.branchName}
                                    isDisabled={true}
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
                                    value={data?.accountDetails?.ifsc}
                                    isDisabled={true}
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
                                    value={data?.accountDetails?.bankName}
                                    isDisabled={true}
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
                                value={data?.accountDetails?.accountType}
                                isDisabled={true}
                                minW={"300px"}
                                type={"text"}
                                placeholder={"Please update account type"}
                            />
                        </Box>

                    </Stack>
                </CardBody>
            </Card>

        </Container>
    );
}

export default ViewProfileDetails;
