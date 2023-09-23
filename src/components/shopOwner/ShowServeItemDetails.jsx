import {Box, Flex, HStack, IconButton, Input, Text} from "@chakra-ui/react";
import {RiDeleteBinLine} from "react-icons/ri";
import {deleteItem} from "../../services/client.js";
import {errorNotification, successNotification} from "../../services/notification.js";

const ShowServeItemDetails = ({item, setIsNewDataAdded, shouldFetchShopDetails}) => {

    const deleteButtonClickHandler = () => {
        deleteItem(item?.itemId)
            .then(res => {
                successNotification(
                    "Success",
                    `Item ${item?.name} successfully deleted`
                )
                shouldFetchShopDetails.current = true;
                setIsNewDataAdded(prevState => (!prevState));
            }).catch(err => {
            errorNotification(
                err.code,
                err.response?.data?.message
            )
        })
    }

    return (
        <HStack
            justifyContent={"space-between"}
        >
            <Box>
                <Flex>
                    <Box>
                        <Text
                        >
                            Name
                        </Text>
                    </Box>
                </Flex>
                <Input
                    readOnly={true}
                    value={item?.name}
                    minW={"300px"}
                />
            </Box>

            <Box>
                <Flex>
                    <Box>
                        <Text
                        >
                            Price
                        </Text>
                    </Box>
                </Flex>
                <Input
                    readOnly={true}
                    value={item?.price}
                    type={"number"}
                    minW={"300px"}
                />
            </Box>

            <Box>
                <IconButton
                    mt={4}
                    colorScheme='red'
                    variant={"outline"}
                    border={"none"}
                    aria-label='Search database'
                    icon={<RiDeleteBinLine/>}
                    size={"lg"}
                    onClick={deleteButtonClickHandler}
                />
            </Box>


        </HStack>
    );
}

export default ShowServeItemDetails;
