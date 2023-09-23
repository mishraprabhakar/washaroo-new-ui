import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Container,
    Divider,
    Heading,
    HStack,
    IconButton,
    Input,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";
import CustomModal from "../UI/CustomModal.jsx";
import AddAddressForm from "../shared/AddAddressForm.jsx";

const ShowCustomerAddress = ({address, isNewDataAdded, shouldFetchShopDetails}) => {

    const {onOpen, onClose, isOpen} = useDisclosure();

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
                        <HStack spacing={4}>
                            <Text
                                fontWeight={"bold"}
                                fontSize={20}
                                textDecoration={"underline"}
                            >
                                Address
                            </Text>
                            <IconButton
                                colorScheme='gray'
                                size={"xs"}
                                variant={"outline"}
                                aria-label='Edit Address'
                                icon={<FaEdit/>}
                                onClick={onOpen}
                            />
                            <CustomModal
                                title={"Add/Update address"}
                                onClose={onClose}
                                isOpen={isOpen}
                            >
                                <AddAddressForm
                                    address={address}
                                    shouldFetchShopDetails={shouldFetchShopDetails}
                                    isNewDataAdded={isNewDataAdded}
                                    onClose={onClose}
                                />
                            </CustomModal>
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    Room Number
                                </Text>
                                <Input
                                    value={address?.roomNumber}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>

                            <Box>
                                <Text>
                                    Area Name
                                </Text>
                                <Input
                                    value={address?.areaName}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    Landmark
                                </Text>
                                <Input
                                    value={address?.landmark}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>

                            <Box>
                                <Text>
                                    City
                                </Text>
                                <Input
                                    value={address?.city}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    Sub District
                                </Text>
                                <Input
                                    value={address?.subDistrict}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>

                            <Box>
                                <Text>
                                    District
                                </Text>
                                <Input
                                    value={address?.district}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <HStack justifyContent={"space-between"}>
                            <Box>
                                <Text>
                                    State
                                </Text>
                                <Input
                                    value={address?.state}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>

                            <Box>
                                <Text>
                                    Country
                                </Text>
                                <Input
                                    value={address?.country}
                                    minW={"300px"}
                                    isDisabled={true}
                                />
                            </Box>
                        </HStack>

                        <Box>
                            <Text>
                                Pin Code
                            </Text>
                            <Input
                                value={address?.pincode}
                                minW={"300px"}
                                isDisabled={true}
                            />
                        </Box>

                    </Stack>
                </CardBody>
            </Card>
        </Container>
    )
}

export default ShowCustomerAddress;
