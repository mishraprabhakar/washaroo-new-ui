import {Box, Flex, HStack, IconButton, Input, Text} from "@chakra-ui/react";
import {RiDeleteBinLine} from "react-icons/ri";

const ShowServeItemDetails = ({item}) => {
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
                />
            </Box>


        </HStack>
    );
}

export default ShowServeItemDetails;
