import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import AddAccountDetailsForm from "../shopOwner/AddAccountDetailsForm.jsx";

const CustomModal = ({title, role, isOpen, onClose, data, update, shouldFetchShopDetails}) => {
    return (
        <Modal
            onClose={onClose}
            isOpen={isOpen}
            size={"xl"}
            scrollBehavior={"inside"}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <AddAccountDetailsForm
                        data={data}
                        update={update}
                        onClose={onClose}
                        shouldFetchShopDetails={shouldFetchShopDetails}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal;
