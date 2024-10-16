import { Box, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Image, Img, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from "react";
import Flag from 'react-world-flags'

export default function Location() {

    const [select, setSelect] = useState("NGA")

    const language = [{
        icon: <Flag code={ "GBR" } />,
        title: "GBP",
        svg: "GBR"
    }, {
        icon: <Flag code={ "NGA" } />,
        title: "NGN",
        svg:"NGA"
    }, {
        icon: <Flag code={ "USA" } />,
        title: "USA",
        svg: "USA"
    }
    ]

    return (
        <Center>
            <Box  zIndex={9000}>
                <Menu matchWidth={true}>
                    <MenuButton  colorScheme="white" fontWeight="400" color="black" as={Button} rightIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                    </svg>}>
                    <Box w="30px" h="17px">
                    <Flag code={ select } />
                    </Box>
                    </MenuButton>
                    <MenuList >
                        {language.map((a, b) => (
                            <MenuItem  onClick={()=>{setSelect(a.svg)}} key={b}>
                                <Center pl="10px" h="17px" w="34px">
                                {a.icon}
                                <Box ml="7px" fontWeight="800" fontSize="12px">
                                    {a.title}
                                </Box>
                                </Center>
                                </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </Center >
    )
}