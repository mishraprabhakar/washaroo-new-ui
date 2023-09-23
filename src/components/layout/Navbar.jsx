'use client'

import {
    Avatar,
    Box,
    Button,
    Center,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightAddon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useBreakpointValue,
    useColorMode,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import {ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon,} from '@chakra-ui/icons'
import appLogo from "../../assets/washaroo-logo.jpeg"
import {NavLink, useNavigate} from "react-router-dom";
import {BsMoonStarsFill, BsSun} from "react-icons/bs";
import {useAuth} from "../../context/AuthContext.jsx";
import {AiOutlineSearch} from "react-icons/ai";
import {useState} from "react";

export default function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode();
    const {isOpen, onToggle} = useDisclosure()
    const {user, isUserAuthenticated, logOut} = useAuth();
    const [enteredSearchQuery, setEnteredSearchQuery] = useState("");
    const navigate = useNavigate();

    const NAV_ITEMS = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
        {
            label: "Contact",
            href: '#',
        }
    ]

    const onClickSearchButtonHandler = () => {
        if (enteredSearchQuery) {
            navigate(`/search/${enteredSearchQuery}`)
        }
    }

    const onChangeSearchInput = (event) => {
        const value = event.target.value.toLocaleString().trim();
        setEnteredSearchQuery(value);
    }

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                <Flex
                    flex={{base: 1, md: 'auto'}}
                    ml={{base: -2}}
                    display={{base: 'flex', md: 'none'}}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                    <NavLink to="/">
                        <Image
                            textAlign={useBreakpointValue({base: 'center', md: 'left'})}
                            src={appLogo}
                            alt="Washaroo Logo"
                            maxW="200px"
                            borderRadius={20}
                            maxH={10}
                        />
                    </NavLink>

                    <Flex display={{base: 'none', md: 'flex'}} ml={10}>
                        <DesktopNav NAV_ITEMS={NAV_ITEMS}/>
                    </Flex>
                </Flex>

                {
                    isUserAuthenticated() && user?.roles === "CUSTOMER" &&
                    <Box mr={4}>
                        <InputGroup>
                            <Input
                                placeholder='Search here with comma seperated'
                                variant='outline'
                                onChange={onChangeSearchInput}
                                value={enteredSearchQuery}
                                w={"300px"}
                            />
                            <InputRightAddon
                                children={<AiOutlineSearch/>}
                                as={Button}
                                onClick={onClickSearchButtonHandler}
                            />
                        </InputGroup>
                    </Box>
                }

                <Stack
                    flex={{base: 1, md: 0}}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}
                >

                    <Button
                        aria-label="Toggle Color Mode"
                        onClick={toggleColorMode}
                        _focus={{boxShadow: "none"}}
                        w="fit-content"
                    >
                        {colorMode === "light" ? <BsMoonStarsFill/> : <BsSun/>}
                    </Button>

                    {!isUserAuthenticated() &&
                        <Button
                            as={NavLink}
                            fontSize={'sm'}
                            fontWeight={400}
                            variant={'link'}
                            to={"/login"}
                        >
                            Sign In
                        </Button>
                    }

                    {!isUserAuthenticated() &&
                        <Button
                            as={NavLink}
                            display={{base: 'none', md: 'inline-flex'}}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'blue.400'}
                            to={"/signup"}
                            _hover={{
                                bg: 'blue.300',
                            }}>
                            Sign Up
                        </Button>
                    }

                    {isUserAuthenticated() &&
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={user?.profileImageUrl}
                                />
                            </MenuButton>
                            <MenuList alignItems={'center'}>
                                <br/>
                                <Center>
                                    <Avatar
                                        size={'2xl'}
                                        src={user?.profileImageUrl}
                                    />
                                </Center>
                                <br/>
                                <Center>
                                    <Text as="b">
                                        {user?.firstName} {user?.lastName}
                                    </Text>
                                </Center>
                                <Center>
                                    <Text as="span" fontSize={14}>
                                        {user?.email}
                                    </Text>
                                </Center>
                                <br/>
                                <MenuDivider/>
                                <MenuItem
                                    as={NavLink}
                                    to={`view/${user?.userId}`}
                                >
                                    View & Update Profile
                                </MenuItem>
                                <MenuItem>Account Settings</MenuItem>
                                <MenuItem
                                    onClick={logOut}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    }
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav NAV_ITEMS={NAV_ITEMS}/>
            </Collapse>
        </Box>
    )
}

const DesktopNav = ({NAV_ITEMS}) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue('gray.800', 'blue.500')
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as={NavLink}
                                p={2}
                                to={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'underline',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({label, href, subLabel}) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{bg: useColorModeValue('pink.50', 'gray.900')}}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{color: 'pink.400'}}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{opacity: '100%', transform: 'translateX(0)'}}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon}/>
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = ({NAV_ITEMS}) => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{md: 'none'}}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({label, children, href}) => {
    const {isOpen, onToggle} = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as={NavLink}
                to={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}
